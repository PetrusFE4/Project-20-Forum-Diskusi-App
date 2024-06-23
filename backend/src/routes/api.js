import { Router } from 'express'
import * as AuthController from '../controllers/authController.js'
import * as PostController from '../controllers/postController.js'
import * as ReplyController from '../controllers/replyController.js'
import * as CommunityController from '../controllers/communityController.js'
import * as StorageController from '../controllers/storageController.js'
import * as ReportController from '../controllers/reportController.js'
import * as UserController from '../controllers/userController.js'
import * as NotificationController from '../controllers/notificationController.js'
import * as KeywordController from '../controllers/keywordController.js'
import * as Middleware from '../middlewares/index.js'

import morgan from 'morgan'

const router = Router()

morgan.token('id', function getId(req) {
    return req.id
})

router.use(Middleware.uuid)
router.use(morgan(':date[iso] | :status | :response-time ms | :remote-addr | :method :url '))

router.post('/upload', Middleware.upload.single('file'), StorageController.uploadFile)


router.get('/keywords', KeywordController.index)

router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)
router.get('/auth/validate', Middleware.auth, AuthController.validate)
router.put('/auth/update', Middleware.auth, AuthController.update)
router.post('/auth/activate', AuthController.activate)
router.post('/auth/resend', Middleware.auth, AuthController.resend)
router.post('/auth/check_username', AuthController.checkAvailability)

router.get('/users', Middleware.auth, UserController.index)
router.get('/users/popular', Middleware.auth, UserController.getPopular)
router.get('/users/:id', Middleware.auth, UserController.show)
router.get('/users/:id/followers', Middleware.auth, UserController.getFollower)
router.get('/users/:id/followings', Middleware.auth, UserController.getFollowing)
router.get('/users/:id/communities', Middleware.auth, UserController.getCommunity)
router.post('/users/:id/follow', Middleware.auth, UserController.follow)
router.post('/users/:id/unfollow', Middleware.auth, UserController.unfollow)

router.get('/posts', Middleware.auth, PostController.index)
router.get('/posts/saved', Middleware.auth, PostController.getSaved)
router.get('/posts/:id', Middleware.auth, PostController.show)
router.post('/posts', Middleware.auth, PostController.store)
router.post('/posts/:id/save', Middleware.auth, PostController.savePost)
router.post('/posts/:id/unsave', Middleware.auth, PostController.unsavePost)
router.put('/posts/:id', Middleware.auth, PostController.update)
router.delete('/posts/:id', Middleware.auth, PostController.destroy)
router.post('/posts/:id/score', Middleware.auth, PostController.score)
router.delete('/posts/:id/score', Middleware.auth, PostController.deleteScore)
router.get('/communities/:community_id/posts', Middleware.auth, PostController.getCommunityPost)
router.get('/users/:user_id/posts', Middleware.auth, PostController.getUserPost)

router.get('/replies', Middleware.auth, ReplyController.index)
router.get('/replies/:id', Middleware.auth, ReplyController.show)
router.post('/replies', Middleware.auth, ReplyController.store)
router.put('/replies/:id', Middleware.auth, ReplyController.update)
router.delete('/replies/:id', Middleware.auth, ReplyController.destroy)
router.post('/replies/:id/score', Middleware.auth, ReplyController.score)
router.delete('/replies/:id/score', Middleware.auth, ReplyController.deleteScore)

router.get('/communities', Middleware.auth, CommunityController.index)
router.get('/communities/popular', Middleware.auth, CommunityController.getPopular)
router.get('/communities/joined', Middleware.auth, CommunityController.getJoined)
router.get('/communities/:id', Middleware.auth, CommunityController.show)
router.get('/communities/:id/members', Middleware.auth, CommunityController.getMember)
router.post('/communities', Middleware.auth, CommunityController.store)
router.put('/communities/:id', Middleware.auth, CommunityController.update)
router.delete('/communities/:id', Middleware.auth, CommunityController.destroy)
router.post('/communities/:id/join', Middleware.auth, CommunityController.join)
router.post('/communities/:id/leave', Middleware.auth, CommunityController.leave)

router.get('/reports', Middleware.auth, ReportController.indexUser)
router.get('/reports/:id', Middleware.auth, ReportController.showUser)
router.get('/communities/:community_id/reports', Middleware.auth, Middleware.communityAdmin, ReportController.indexCommunity)
router.get('/communities/:community_id/reports/:id', Middleware.auth, Middleware.communityAdmin, ReportController.showCommunity)

router.get('/notifications', Middleware.auth, NotificationController.index)
router.get('/notifications/:id', Middleware.auth, NotificationController.show)

export default router