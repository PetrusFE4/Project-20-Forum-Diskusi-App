import http from 'http'

import { InitWebSocket } from './src/notification-service/config/websocket.js'
import Run from './src/notification-service/app.js'

const port = process.env.WS_PORT || 6420
const host = process.env.WS_HOST || 'localhost'

const server = http.createServer()
InitWebSocket(server)

Run()

server.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
})