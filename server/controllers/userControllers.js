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
   * @description sign up a new user
   *
   * @param {Object} req user request object
   * @param {Object} res server response object
   *
   * @return {undefined}
   */
exports.signUp = (req, res) => {
  const { errors, isValid } = validators.validateSignUpInput(req.body);
  if (!isValid) {
    return res.status(400).send({ error: errors });
  }
  User.findOne({
    email: req.body.email,
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
                email, fullName, password, userName
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
                  fullName: newUser.fullName,
                  userName: newUser.userName,
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
   * @description sign in a registered user
   *
   * @param {Object} req user request object
   * @param {Object} res server response object
   *
   * @return {undefined}
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
          message: 'Welcome!!',
          success: true,
          username: user.username,
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
 * @description allows user update profile
 *
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return { undefined }
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
        if (error.codeName === 'DuplicateKey' &&
        error.message.includes(req.body.userName)) {
          return res.status(409).send({
            message: 'This username is already in use by another account.',
            success: false
          });
        }
        return res.status(500).send(error);
      }
      if (user) {
        return res.status(200).send({
          user: {
            fullName: convertCase(fullName),
            userName: convertCase(userName),
            email: email.toLowerCase(),
          },
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
 * @return {undefined}
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

    Bill.update({ _id: billId }, {
      $set: column
    }, (err, response) => {
      if (err) {
        return res.status(400).send({
          message: error,
        });
      }
      return res.status(201).send({
        success: true,
        message: `Your ${status} was added successfully`,
        newVote,
      });
    });
  });
};

/**
 * @description allows user remove upvote
 *
 * @param {object} req - response object
 * @param {object} res - request object
 * @param {object} voteDetails - voteDetails object
 * @param {object} billFound - billFound object
 *
 * @return {undefined}
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

    Bill.update({ _id: billId }, {
      $set: column
    }, (err, response) => {
      if (err) {
        // change this status code and all other 418 errors
        return res.status(400).send({
          message: error,
        });
      }
      return res.status(200).send({
        success: true,
        message: `Your ${status} has been remove`,
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
 * @return {undefined}
 */
const toggleVote = (req, res, voteDetails, billFound) => {
  const { billId, status } = voteDetails;
  if (status === 'upvote') {
    Bill.findByIdAndUpdate({ _id: billId }, {
      $set: {
        upVoteCount: billFound.upVoteCount + 1,
        downVoteCount: billFound.downVoteCount - 1,
      },
    })
      .exec()
      .then((updatedVoteCount) => {
        if (!updatedVoteCount) {
          return res.status(500).send({
            success: false,
            message: 'internal server error'
          });
        }
        if (updatedVoteCount) {
          Vote.findOneAndUpdate({ votedBill: billId }, {
            $set: {
              status
            },

          }, { new: true })
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
                updatedVoteStatus,
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
    })
      .exec()
      .then((updatedVoteCount) => {
        if (!updatedVoteCount) {
          return res.status(500).send({
            success: false,
            message: 'internal server error'
          });
        }
        if (updatedVoteCount) {
          Vote.findOneAndUpdate({ votedBill: billId }, {
            $set: {
              status
            },

          }, { new: true })
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
                updatedVoteStatus,
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
 * @return {undefined}
 */
exports.upVoteBill = (req, res) => {
  const userId = req.decoded.id;
  const { status } = req.body;
  const { billId } = req.params;

  Bill.findById({ _id: billId })
    .exec()
    .then((billFound) => {
      if (!billFound) {
        return res.status(404).send({
          message: `Sorry, no bill with id ${billId} `,
        });
      }
      if (billFound.billProgress !== 'House Passed') {
        Vote.findOne({
          votedBill: billId,
          votedBy: userId
        }, (err, result) => {
          if (err) {
            return res.status(400).send({
              message: 'An error occured while updating',
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
 * @description allows a user downvote a bill
 *
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return {undefined}
 */
exports.downVoteBill = (req, res) => {
  const userId = req.decoded.id;
  const { status } = req.body;
  const { billId } = req.params;

  Bill.findById(billId)
    .exec()
    .then((billFound) => {
      if (!billFound) {
        return res.status(404).send({
          message: `Sorry, no bill with id ${billId} `,
        });
      }
      if (billFound.billProgress !== 'House Passed') {
        Vote.findOne({
          votedBill: billId,
          votedBy: userId
        }, (err, result) => {
          if (err) {
            return res.status(400).send({
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
   * @returns { undefined }
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
    .exec()
    .then((billFound) => {
      if (!billFound) {
        return res.status(404).send({
          message: `Sorry, no bill with id ${billId}`,
        });
      }
      if (billFound) {
        if (billFound.billProgress !== 'House Passed') {
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
   * @returns { undefined }
   */
exports.fetchOpinion = (req, res) => {
  Opinion.find({
    opinionBill: req.params.billId
  }).then((opinions) => {
    if (!opinions) {
      return res.status(404).send({
        success: false,
        message: 'No opinion found!'
      });
    }
    res.status(200).send({
      opinions,
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
   * @returns { undefined }
   */
exports.fetchUserVotedBill = (req, res) => {
  const userId = req.decoded.id;
  let options = {
    populate: 'votedBill',
    page: 1 || Number(req.query.page),
    limit: 6 || Number(req.query.limit)
  };
  Vote.paginate({
    votedBy: userId
  }, options)
    .then((userVotes) => {
      if (!userVotes) {
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
   * @description allows a user to search for bills
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { undefined }
   */
exports.searchBills = (req, res) => {
  if (!req.body.searchTerm) {
    res.status(400).send({
      message: 'please add search term'
    });
  }
  const offset = 1 || Number(req.query.offset);
  const limit = 6 || Number(req.query.limit);
  let count;
  Bill.count({
    $text: { $search: req.body.searchTerm.trim() },
  }).exec()
    .then((iscount) => {
      count = iscount;
      if (count > 0) {
        Bill.find({
          $text: { $search: req.body.searchTerm.trim() },
        })
          .limit(limit).exec()
          .then(bills => res.status(202).send({
            bills,
            pageInfo: pagination(count, limit, offset),
          }));
      } else {
        return res.status(404).send({
          message: 'bill not found',
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
   * @returns { undefined }
   */
exports.getABill = (req, res) => {
  const { billId } = req.params;
  Bill.find({
    _id: billId
  })
    .exec()
    .then((billFound) => {
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
