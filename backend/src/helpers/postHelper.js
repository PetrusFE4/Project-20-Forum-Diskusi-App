export const populateCommunity = (communityId) => ([
    {
        $addFields: {
            has_community: { $cond: { if: { $gt: ['$community', null] }, then: true, else: false } }
        }
    },
    {
        $facet: {
            withCommunity: [
                { $match: { has_community: true } },
                {
                    $lookup: {
                        from: 'communities',
                        localField: 'community',
                        foreignField: '_id',
                        pipeline: [
                            {
                                $project: {
                                    'creator': 0
                                }
                            }
                        ],
                        as: 'community'
                    }
                },
                { $unwind: '$community' }
            ],
            withoutCommunity: [
                { $match: { has_community: false } }
            ]
        }
    },
    {
        $project: {
            posts: { $concatArrays: ['$withCommunity', '$withoutCommunity'] }
        }
    },
    { $unwind: '$posts' },
    { $replaceRoot: { newRoot: '$posts' } }
])

export const populateUser = () => ([
    {
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            pipeline: [
                {
                    $project: {
                        'email': 0,
                        'password': 0
                    }
                }
            ],
            as: 'user'
        }
    },
    {
        $unwind: '$user'
    }
])

export const checkIfUserGiveScore = (userId) => ([
    {
        $lookup: {
            from: 'postscores',
            let: { post_id: '$_id', user_id: userId },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$post', '$$post_id'] },
                                { $eq: ['$user', '$$user_id'] }
                            ]
                        }
                    }
                }
            ],
            as: 'matchedScores',
        }
    },
    {
        $unwind: { path: '$matchedScores', preserveNullAndEmptyArrays: true }
    },
    {
        $addFields: {
            'user_score': {
                $cond: {
                    if: { $ne: ['$matchedScores', {}] },
                    then: '$matchedScores.score',
                    else: 0
                }
            }
        }
    },
    {
        $project: {
            'matchedScores': 0
        }
    }
])

export const checkIfUserSaved = (userId) => ([
    {
        $lookup: {
            from: 'usersavedposts',
            let: { post_id: '$_id', user_id: userId },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$post', '$$post_id'] },
                                { $eq: ['$user', '$$user_id'] }
                            ]
                        }
                    }
                }
            ],
            as: 'matchedSave'
        }
    },
    {
        $addFields: {
            'saved': {
                $cond: {
                    if: { $ne: ['$matchedSave', []] },
                    then: true,
                    else: false
                }
            }
        }
    },
    {
        $project: {
            'matchedSave': 0
        }
    }
])

export const sortTrending = () => ([
    {
        $addFields: {
            // created_at_epoch: { $toLong: { $dateToString: { format: "%s", date: "$created_at" } } }
            created_at_epoch: { $toLong: '$created_at' }
        }
    },
    {
        $addFields: {
            trendingScore: {
                $add: [
                    "$score",
                    {
                        $multiply: [
                            { $divide: [{ $subtract: [new Date().getTime(), "$created_at_epoch"] }, 3600000] },
                            -1
                        ]
                    }
                ]
            }
        }
    },
    {
        $sort: { trendingScore: -1 }
    },
    {
        $project: {
            trendingScore: 0,
            created_at_epoch: 0
        }
    }
])

export const sortPopular = () => ([
    {
        $sort: { score: -1, created_at: -1 }
    }
])

export const sortNewest = () => ([
    {
        $sort: { created_at: -1, score: -1 }
    }
])