const mockData = {
  bills: {
    bill1: {
      _id: '5ab778bdb28d53a17b02cbc0',
      updated_at: '2018-03-25T10:25:30.023Z',
      created_at: '2018-03-25T10:23:57.454Z',
      title: 'UCHEYA IS STUBBORN',
      description: 'very stubborn and sweet at the same time',
      __v: 0,
      billProgress: 'Not enacted',
      downVoteCount: 1,
      upVoteCount: 0
    },
    bill2: {
      _id: '5ab62c1e2dbcda1e102a79fa',
      updated_at: '2018-03-25T10:21:19.068Z',
      created_at: '2018-03-24T10:44:46.320Z',
      title: 'Senators ',
      description: 'Nigerian Senators cannot stop all these their lies.',
      __v: 0,
      billProgress: 'Senate Voted',
      downVoteCount: 1,
      upVoteCount: 2
    },
    bill3: {
      _id: '5ab62c5a2dbcda1e102a79fb',
      updated_at: '2018-03-25T10:19:26.883Z',
      created_at: '2018-03-24T10:45:46.635Z',
      title: 'JAMB OFFICIALS AND SNAKE',
      description: `How a snake stole 36million 
      from nigeria jamb who can believe is lie.`,
      __v: 0,
      billProgress: 'Not enacted',
      downVoteCount: 0,
      upVoteCount: 2
    }
  },
  bill: {
    billFound: {
      _id: '5ab62c5a2dbcda1e102a79fb',
      updated_at: '2018-03-25T10:19:26.883Z',
      created_at: '2018-03-24T10:45:46.635Z',
      title: 'JAMB OFFICIALS AND SNAKE',
      description: `How a snake stole 36million from nigeria
       jamb who can believe is lie.`,
      __v: 0,
      billProgress: 'Not enacted',
      downVoteCount: 0,
      upVoteCount: 2
    },
  },
  votedBill: {
    _id: '5ab62c5a2dbcda1e102a79fb',
    updated_at: '2018-03-25T15:58:53.162Z',
    created_at: '2018-03-24T10:44:46.320Z',
    title: 'JAMB OFFICIALS AND SNAKE',
    description: `How a snake stole 36million from nigeria
       jamb who can believe is lie.`,
    __v: 0,
    billProgress: 'House passed',
    downVoteCount: 0,
    upVoteCount: 3
  },
  status: 'upvote',

  searchTerm: 'jamb',

  searchTerm1: 'guhubivbhvue',

  opinions: {
    opinion: 'This bill dey wan kind self'
  },

  userVotedBills: {
    userVotes: [
      {
        _id: '5ab6aeec46c66b6bc4980d7b',
        updated_at: '2018-03-24T20:02:52.884Z',
        created_at: '2018-03-24T20:02:52.884Z',
        status: 'upvote',
        votedBill: {
          _id: '5ab62c1e2dbcda1e102a79fa',
          updated_at: '2018-03-25T16:23:01.659Z',
          created_at: '2018-03-24T10:44:46.320Z',
          title: 'SENATORS',
          description: 'Nigerian Senators cannot stop all these their lies.',
          __v: 0,
          billProgress: 'House passed',
          downVoteCount: 2,
          upVoteCount: 2
        },
        votedBy: '5ab626352dbcda1e102a79f7',
        __v: 0
      }
    ],
  }
};
export default mockData;
