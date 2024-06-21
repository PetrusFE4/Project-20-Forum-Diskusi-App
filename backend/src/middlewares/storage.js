import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../../frontend/dist', 'uploads', 'tmp'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

export const upload = multer({ storage: storage })