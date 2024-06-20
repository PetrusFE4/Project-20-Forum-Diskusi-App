import app from './src/app.js'
import express from 'express'
import fs from 'fs'
import http from 'http'

const port = process.env.PORT || 3000
const host = process.env.HOST || 'http://localhost'

app.use(express.static('public'))
const server = http.createServer(app)
InitWebS

var dirs = ['./public/uploads/', './public/uploads/tmp', './public/uploads/community', './public/uploads/post', './public/uploads/user']

for (const dir of dirs) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
}

server.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
})