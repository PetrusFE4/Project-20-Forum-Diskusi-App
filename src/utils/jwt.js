import jwt from 'jsonwebtoken'

const jwtKey = process.env.JWT_KEY || 'secret'

export const generateToken = (payload) => {
    return jwt.sign(payload, jwtKey)
}

export const generateTokenWithExpire = (payload, seconds) => {
    return jwt.sign(payload, jwtKey, { expiresIn: seconds })
}

export const validateToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err)
                reject(err)

            resolve(decoded)
        })
    })
}