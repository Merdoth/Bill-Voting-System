import bcrypt from 'bcrypt';
import User from '../models/User';
import Vote from '../models/Vote';
import Opinion from '../models/Opinion';
import Bill from '../models/Bill';
import convertCase from '../utils/convertCase';
import generateToken from '../utils/generateToken';
import pagination from '../utils/pagination';
import validators from '../middlewares/validators';

/**
   * @description allows a new user sign up
   *
   * @param {Object} req user request object
   * @param {Object} res server response object
   *
   * @return {object} json
   */
exports.signUp = (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const { errors, isValid } = validators.validateSignUpInput(req.body);
  if (!isValid) {
    return res.status(400).send({ error: errors });
  }
  User.findOne({
    email
  })
    .exec()
    .then((emailFound) => {
      if (emailFound) {
        res.status(409).send({
          message: 'Email already exists',
          success: false
        });
      } else {
        User.findOne({
          userName: convertCase(req.body.userName)
        })
          .exec()
          .then((userNameFound) => {
            if (userNameFound) {
              res.status(409).send({
                message: 'User with this username already exists',
                success: false
              });
            } else {
              const {
                fullName, password, userName
              }
                = req.body;
              const user = new User({
                fullName: convertCase(fullName.trim()),
                userName: convertCase(userName.trim()),
                permission: 3,
                email: email.trim().toLowerCase(),
                password: password.trim(),
              });
              user.save((error, newUser) => {
                if (error) {
                  return res.status(500).send({
                    success: false,
                    message: 'Internal server error'
                  });
                }
                return res.status(201).send({
                  success: true,
                  token: generateToken(newUser),
                  message: 'User successfully created',
                });
              });
            }
          })
          .catch((error) => {
            res.status(500)
              .send({ message: 'Internal server error', error: error.message });
          });
      }
    }).catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error: error.message });
    });
};

/**
   * @description  allows a registered user sign in
   *
   * @param {Object} req user request object
   * @param {Object} res server response object
   *
   * @return {object} json
   */
exports.signIn = (req, res) => {
  const { errors, isValid } = validators.validateSignInInput(req.body);
  if (!isValid) {
    return res.status(400).send({ error: errors });
  }
  User.findOne({
    email: req.body.email.trim().toLowerCase()
  })
    .select('+password')
    .exec().then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Failed to authenticate user'
        });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(422).send({
          success: false,
          message: 'Incorrect password'
        });
      }
      if (user) {
        return res.status(200).send({
          message: `Welcome ${user.userName}`,
          success: true,
          token: generateToken(user)
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message
      });
    });
};

/**
 * @description allows user update his/her profile
 *
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return { object } json
 */

exports.updateUserProfile = (req, res) => {
  const { errors, isValid } = validators.validateUserProfile(req.body);
  if (!isValid) {
    return res.status(400).send({ error: errors });
  }
  const { fullName, userName, email } = req.body;
  User.findByIdAndUpdate(
    { _id: req.decoded.id },
    {
      $set: {
        fullName: convertCase(fullName),
        userName: convertCase(userName),
        email: email.toLowerCase(),
      },
    },
    { new: true },
  )
    .exec((error, user) => {
      if (error) {
        if (error.codeName === 'DuplicateKey' &&
          error.message.includes(req.body.email)) {
          return res.status(409).send({
            message: 'This email address is already in use by another account.',
            success: false
          });
        }
        if (error.codeName === 'DuplicateKey') {
          return res.status(409).send({
            message: 'This username is already in use by another account.',
            success: false
          });
        }
        return res.status(500).send({
          message: 'Internal server error', error
        });
      }
      if (user) {
        return res.status(200).send({
          user,
          message: 'Profile successfully updated',
        });
      }
      return res.status(404).send({ message: 'User not Found' });
    });
};
/**
 * @description allows user add a vote
 *
 * @param {object} req - response object
 * @param {object} res - request object
 * @param {object} voteDetails - voteDetails object
 * @param {object} billFound - billFound object
 *
 * @return {object} json
 */
const addVote = (req, res, voteDetails, billFound) => {
  const { userId, billId, status } = voteDetails;
  const vote = new Vote({
    status,
    votedBill: billId,
    votedBy: userId
  });
  vote.save((error, newVote) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal server Error',
        error: error.message
      });
    }

    const newVoteCount = status === 'upvote' ?
      billFound.upVoteCount + 1 :
      billFound.downVoteCount + 1;

    const column = status === 'upvote' ?
      { upVoteCount: newVoteCount } :
      { downVoteCount: newVoteCount };

    Bill.findByIdAndUpdate({ _id: billId }, {
      $set: column
    }, { new: true }, (err, votedBill) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: 'ID does not exist',
        });
      }
      return res.status(201).send({
        success: true,
        message: `Your ${status} was added successfully`,
        votedBill,
      });
    });
  });
};

/**
 * @description allows user remove a vote
 *
 * @param {object} req - response object
 * @param {object} res - request object
 * @param {object} voteDetails - voteDetails object
 * @param {object} billFound - billFound object
 *
 * @return {object} json
 */
const removeVote = (req, res, voteDetails, billFound) => {
  const { userId, billId, status } = voteDetails;

  Vote.remove({ votedBill: billId, votedBy: userId }, (error) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal server Error',
        error: error.message
      });
    }

    const newVoteCount = status === 'upvote' ?
      billFound.upVoteCount - 1 :
      billFound.downVoteCount - 1;

    const column = status === 'upvote' ?
      { upVoteCount: newVoteCount } :
      { downVoteCount: newVoteCount };

    Bill.findByIdAndUpdate({ _id: billId }, {
      $set: column
    }, { new: true }, (err, votedBill) => {
      if (err) {
        return res.status(400).send({
          message: error,
        });
      }
      return res.status(200).send({
        success: true,
        message: `Your ${status} has been remove`,
        votedBill
      });
    });
  });
};


/**
 * @description allows user toggle through votes
 *
 * @param {object} req - response object
 * @param {object} res - request object
 * @param {object} voteDetails - voteDetails object
 * @param {object} billFound - billFound object
 *
 * @return {object} json
 */
const toggleVote = (req, res, voteDetails, billFound) => {
  const { billId, userId, status } = voteDetails;
  if (status === 'upvote') {
    Bill.findByIdAndUpdate({ _id: billId }, {
      $set: {
        downVoteCount: billFound.downVoteCount - 1,
        upVoteCount: billFound.upVoteCount + 1,
      },
    }, { new: true })
      .exec()
      .then((updatedVoteCount) => {
        if (!updatedVoteCount) {
          return res.status(500).send({
            success: false,
            message: 'internal server error'
          });
        }
        if (updatedVoteCount) {
          Vote.findOneAndUpdate({ votedBill: billId, votedBy: userId }, {
            $set: {
              status
            },

          })
            .exec()
            .then((updatedVoteStatus) => {
              if (!updatedVoteStatus) {
                return res.status(400).send({
                  message: 'An error occured while updating',
                });
              }
              return res.status(201).send({
                success: true,
                message: `Your ${status} was added successfully`,
                updatedVoteCount,
              });
            });
        }
      });
  } else if (status === 'downvote') {
    Bill.findByIdAndUpdate({ _id: billId }, {
      $set: {
        upVoteCount: billFound.upVoteCount - 1,
        downVoteCount: billFound.downVoteCount + 1,
      },
    }, { new: true })
      .exec()
      .then((updatedVoteCount) => {
        if (!updatedVoteCount) {
          return res.status(500).send({
            success: false,
            message: 'internal server error'
          });
        }
        if (updatedVoteCount) {
          Vote.findOneAndUpdate({
            votedBill: billId,
            votedBy: userId
          }, {
            $set: {
              status
            },

          })
            .exec()
            .then((updatedVoteStatus) => {
              if (!updatedVoteStatus) {
                return res.status(400).send({
                  message: 'An error occured while updating',
                });
              }
              return res.status(201).send({
                success: true,
                message: `Your ${status} was added successfully`,
                updatedVoteCount,
              });
            });
        }
      });
  }
};

/**
 * @description allows a user upvote a bill
 *
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return {object} json
 */
exports.upVoteBill = (req, res) => {
  const userId = req.decoded.id;
  const { status } = req.body;
  const { billId } = req.params;

  Bill.findById({ _id: billId })
    .exec((error, billFound) => {
      if (error) {
        return res.status(404).send({
          success: false,
          message: `Sorry, no bill with id ${billId} `,
        });
      }
      if (billFound.billProgress !== 'House passed') {
        Vote.findOne({
          votedBill: billId,
          votedBy: userId
        }, (err, result) => {
          if (err) {
            return res.status(404).send({
              success: false,
              message: 'Id does not exist',
            });
          }

          if (result) {
            if (result && result.status === 'upvote') {
              const voteDetails = {
                userId, billId, status
              };
              return removeVote(req, res, voteDetails, billFound);
            } else if (result && result.status === 'downvote') {
              const voteDetails = {
                userId, billId, status,
              };
              return toggleVote(req, res, voteDetails, billFound);
            }
          } else {
            const voteDetails = {
              userId, billId, status
            };
            return addVote(req, res, voteDetails, billFound);
          }
        });
      } else {
        res.status(403).send({
          success: false,
          message: 'Sorry, voting for this bill is closed',
        });
      }
    }).catch((error) => {
      res.status(500).send({
        success: false,
        message: 'Internal server Error',
        error: error.message
      });
    });
};

/**
 * @description allows a user downvote a bill
 *
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return {object} json
 */
exports.downVoteBill = (req, res) => {
  const userId = req.decoded.id;
  const { status } = req.body;
  const { billId } = req.params;

  Bill.findById(billId)
    .exec((error, billFound) => {
      if (error) {
        return res.status(404).send({
          success: false,
          message: `Sorry, no bill with id ${billId} `,
        });
      }
      if (billFound.billProgress !== 'House passed') {
        Vote.findOne({
          votedBill: billId,
          votedBy: userId
        }, (err, result) => {
          if (err) {
            return res.status(404).send({
              success: false,
              message: `Sorry, no bill with id ${billId} `,
            });
          }

          if (result) {
            if (result && result.status === 'downvote') {
              const voteDetails = {
                userId, billId, status
              };
              return removeVote(req, res, voteDetails, billFound);
            } else if (result && result.status === 'upvote') {
              const voteDetails = {
                userId, billId, status
              };
              return toggleVote(req, res, voteDetails, billFound);
            }
          } else {
            const voteDetails = {
              userId, billId, status
            };
            return addVote(req, res, voteDetails, billFound);
          }
        });
      } else {
        res.status(403).send({
          success: false,
          message: 'Sorry, voting for this bill is closed',
        });
      }
    }).catch((error) => {
      res.status(500).send({
        message: 'Internal server Error',
        error: error.message
      });
    });
};

/**
   * @description allows a user add an opinion
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { object } json
   */
exports.addOpinion = (req, res) => {
  const { errors, isValid } = validators.validateOpinion(req.body);
  if (!isValid) {
    return res.status(400).send({ error: errors });
  }
  const { opinion } = req.body;
  const userId = req.decoded.id;
  const { billId } = req.params;

  Bill.findById({ _id: billId })
    .exec((err, billFound) => {
      if (err) {
        return res.status(404).send({
          success: false,
          message: `Sorry, no bill with id ${billId}`,
        });
      }
      if (billFound) {
        if (billFound.billProgress !== 'House passed') {
          const newDetail = new Opinion({
            opinion,
            opinionBy: userId,
            opinionBill: billId
          });
          newDetail.save((error, newOpinion) => {
            if (error) {
              return res.status(500).send({
                success: false,
                message: 'Internal server Error',
              });
            }
            return res.status(201).send({
              success: true,
              message: 'Opinion successfully added',
              newOpinion
            });
          });
        } else {
          res.status(403).send({
            success: false,
            message: 'Sorry, posting opinions for this bill is closed',
          });
        }
      }
    }).catch((error) => {
      res.status(500).send({
        message: 'Internal server Error',
        error: error.message
      });
    });
};

/**
   * @description allows a user get all opinions
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { object } json
   */
exports.fetchOpinion = (req, res) => {
  Opinion.find({
    opinionBill: req.params.billId
  }).exec((err, opinions) => {
    if (err) {
      return res.status(404).send({
        success: false,
        message: `Sorry, no bill with id ${req.params.billId}`,
      });
    }
    if (!opinions) {
      return res.status(404).send({
        success: false,
        message: 'No opinion found!'
      });
    }
    res.status(200).send({
      opinions,
      status: true,
      message: 'Opinion successfully fetched!'
    });
  }).catch((error) => {
    res.status(500).send({
      message: 'Internal server Error',
      error: error.message
    });
  });
};

/**
   * @description allows a user to fetch all bills voted
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { object } json
   */
exports.fetchUserVotedBill = (req, res) => {
  const userId = req.decoded.id;
  let options = {
    populate: 'votedBill',
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 6
  };
  Vote.paginate({
    votedBy: userId
  }, options)
    .then((userVotes) => {
      if (userVotes.docs.length === 0) {
        return res.status(404).send({
          success: false,
          message: 'You did not vote any bill please try to vote some!'
        });
      }
      const pageInfo = {
        pages: userVotes.pages,
        page: userVotes.page,
        total: userVotes.total,
      };
      res.status(200).send({
        userVotes: userVotes.docs,
        pageInfo,
        status: true,
        message: 'User voted bill was fetched successfully!'
      });
    }).catch((error) => {
      res.status(500).send({
        message: 'Internal server Error',
        error: error.message
      });
    });
};


/**
   * @description allows a user to fetch all bills
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { object } json
   */
exports.getAllBills = (req, res) => {
  let options = {
    sort: ({ title: 'descending' }),
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 6
  };
  Bill.paginate({
  }, options)
    .then((bills) => {
      if (!bills) {
        return res.status(404).send({
          success: false,
          message: 'You don\'t a bill yet, please try to vote some!'
        });
      }
      const pageInfo = {
        pages: bills.pages,
        page: bills.page,
        total: bills.total,
      };
      res.status(200).send({
        allBills: bills.docs,
        pageInfo,
        status: true,
        message: 'Bills fetched successfully!'
      });
    }).catch((error) => {
      res.status(500).send({
        message: 'Internal server Error',
        error: error.message
      });
    });
};

/**
   * @description allows a user to search for bills
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { object } json
   */
exports.searchBills = (req, res) => {
  if (!req.body.searchTerm) {
    res.status(400).send({
      status: false,
      message: 'please add search term'
    });
  }
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit) || 6;
  let count;
  Bill.count({
    $text: { $search: req.body.searchTerm.trim() }
  }).exec()
    .then((iscount) => {
      count = iscount;
      if (count > 0) {
        Bill.find({
          $text: { $search: req.body.searchTerm.trim() },
        })
          .skip(offset)
          .limit(limit).exec()
          .then(bills => res.status(202).send({
            bills,
            pageInfo: pagination(count, limit, offset),
          }));
      } else {
        return res.status(404).send({
          status: false,
          message: 'Bill not found',
        });
      }
    })

    .catch(() => {
      res.status(500);
    });
};

/**
   * @description allows a user get a bill
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { object } json
   */
exports.getABill = (req, res) => {
  const { billId } = req.params;
  Bill.findOne({
    _id: billId
  })
    .exec((err, billFound) => {
      if (err) {
        return res.status(404).send({
          success: false,
          message: `Sorry, no bill with id ${billId}`,
        });
      }
      if (!billFound || billFound.length < 1) {
        return res.status(404).send({
          success: false,
          message: 'None Found!!! Bill does not exist.'
        });
      }
      res.status(200).send({
        billFound,
        message: 'Bill successfully fetched'
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: 'internal server error',
        error: error.message
      });
    });
};

/**
   * @description allows get one user
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { object } json
   */
exports.getAUser = (req, res) => {
  const { userId } = req.params;
  User.findOne({
    _id: userId
  })
    .exec((err, userFound) => {
      if (err) {
        return res.status(404).send({
          success: false,
          message: `Sorry, no bill with id ${billId}`,
        });
      }
      if (!userFound || userFound.length < 1) {
        return res.status(404).send({
          success: false,
          message: 'User does not exist.'
        });
      }
      res.status(200).send({
        userFound,
        message: 'User successfully fetched'
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: 'internal server error',
        error: error.message
      });
    });
};
