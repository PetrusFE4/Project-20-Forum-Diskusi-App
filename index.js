import app from './src/api/app.js'
import http from 'http'

import WebSocket from './src/websocket/websocket.js'

const port = process.env.PORT || 3000
const host = process.env.HOST || 'http://localhost'

const server = http.createServer(app)

WebSocket(server)

server.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
})