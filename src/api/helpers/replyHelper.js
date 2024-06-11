export const checkIfUserGiveScore = (userId) => ([
    {
        $lookup: {
            from: 'replyscores',
            let: { reply_id: '$_id', user_id: userId },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$reply', '$$reply_id'] },
                                { $eq: ['$user', '$$user_id'] }
                            ]
                        }
                    }
                }
            ],
            as: 'matchedScores'
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