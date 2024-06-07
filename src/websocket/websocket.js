import { Server } from 'socket.io'
import { validateToken } from '../api/utils/jwt.js'

let WebSocket

const InitWebSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        }
    })

    io.use((socket, next) => {
        const token = socket.handshake.query.token;

        if (token) {
            validateToken(token).then(decoded => {
                socket.user_id = decoded._id
                next()
            })
        } else {
            next(new Error('Authentication error'))
        }
    });

    io.on('connection', (socket) => {
        const userId = socket.user_id
        socket.join(`user:${userId}`)
        console.log(`User with ID ${userId} connected and joined room user:${userId}`)

        socket.on('disconnect', () => {
            console.log(`User with ID ${userId} disconnected`)
        })
    })

    WebSocket = io
}

export { WebSocket, InitWebSocket }