export const filterPopular = () => ([
    {
        $sort: { follower_count: -1 }
    }
])

export const checkIfUserFollowed = (follower) => ([
    {
        $lookup: {
            from: 'userfollowers',
            let: { user_id: '$_id', follower_id: follower },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$user', '$$user_id'] },
                                { $eq: ['$follower', '$$follower_id'] }
                            ]
                        }
                    }
                } 
            ],
            as: 'matchedUser'
        }
    },
    {
        $addFields: {
            'following': {
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