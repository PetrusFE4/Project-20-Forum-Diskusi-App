export const populateCommunity = (communityId) => ([
    {
        $addFields: {
            hasCommunity: { $cond: { if: { $gt: ['$community', null] }, then: true, else: false } }
        }
    },
    {
        $facet: {
            withCommunity: [
                { $match: { hasCommunity: true } },
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
                { $match: { hasCommunity: false } }
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