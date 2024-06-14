import fs from 'fs'

const mainSwaggerDoc = JSON.parse(fs.readFileSync('./docs/main.json', 'utf8'));

const authPaths = JSON.parse(fs.readFileSync('./docs/paths/auth.json', 'utf8'));
const communityPaths = JSON.parse(fs.readFileSync('./docs/paths/community.json', 'utf8'));
const postPaths = JSON.parse(fs.readFileSync('./docs/paths/post.json', 'utf8'));
const replyPaths = JSON.parse(fs.readFileSync('./docs/paths/reply.json', 'utf8'));

const postSchema = JSON.parse(fs.readFileSync('./docs/components/schemas/post.json', 'utf8'));
const replySchema = JSON.parse(fs.readFileSync('./docs/components/schemas/reply.json', 'utf8'));
const userSchema = JSON.parse(fs.readFileSync('./docs/components/schemas/user.json', 'utf8'));

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