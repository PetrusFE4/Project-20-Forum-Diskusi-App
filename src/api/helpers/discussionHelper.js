export const checkIfUserGiveScore = (userId) => ([
    {
        $lookup: {
            from: 'discussionscores',
            let: { discussion_id: '$_id', user_id: userId },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$discussion', '$$discussion_id'] },
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