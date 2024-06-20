export const checkIfUserJoined = (userId) => ([
    {
        $lookup: {
            from: 'communityusers',
            let: { community_id: '$_id', user_id: userId },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$community', '$$community_id'] },
                                { $eq: ['$user', '$$user_id'] }
                            ]
                        }
                    }
                } 
            ],
            as: 'matchedUser'
        }
    },
    // {
    //     $unwind: { path: '$matchedUser', preserveNullAndEmptyArrays: true }
    // },
    {
        $addFields: {
            'joined': {
                $cond: {
                    if: { $ne: ['$matchedUser', []] },
                    then: true,
                    else: false
                }
            }
        }
    },
    {
        $project: {
            'matchedUser': 0
        }
    }
])

export const populateModerator = () => ([
    {
        $lookup: {
            from: 'moderators',
            localField: '_id',
            foreignField: 'community',
            pipeline: [
                {
                    $project: { 'community': 0 }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        pipeline: [
                            {
                                $project: {
                                    'password': 0,
                                    'email': 0
                                }
                            }
                        ],
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                }
            ],
            as: 'moderators'
        }
    }
])

export const sortPopular = () => ([
    {
        $sort: { member_count: -1, created_at: -1 }
    }
])