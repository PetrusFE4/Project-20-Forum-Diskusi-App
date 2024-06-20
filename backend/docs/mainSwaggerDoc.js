import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mainSwaggerDoc = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'main.json'), 'utf8'));

const authPaths = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'paths/auth.json'), 'utf8'));
const communityPaths = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'paths/community.json'), 'utf8'));
const postPaths = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'paths/post.json'), 'utf8'));
const replyPaths = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'paths/reply.json'), 'utf8'));

const postSchema = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'components/schemas/post.json'), 'utf8'));
const replySchema = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'components/schemas/reply.json'), 'utf8'));
const userSchema = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'components/schemas/user.json'), 'utf8'));

mainSwaggerDoc.paths = {
    ...mainSwaggerDoc.paths,
    ...authPaths,
    ...communityPaths,
    ...postPaths,
    ...replyPaths
};

mainSwaggerDoc.components = {
    ...mainSwaggerDoc.components,
    schemas: {
        ...mainSwaggerDoc.components?.schemas,
        ...postSchema,
        ...replySchema,
        ...userSchema
    },
};

export default mainSwaggerDoc