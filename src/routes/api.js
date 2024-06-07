import { Router } from 'express'
import * as AuthController from '../controllers/authController.js'
import * as DiscussionController from '../controllers/discussionController.js'
import * as ReplyController from '../controllers/replyController.js'
import * as SubjectController from '../controllers/subjectController.js'
import * as CommunityController from '../controllers/communityController.js'
import * as Middleware from '../middlewares/index.js'

import morgan from 'morgan'

const router = Router()

morgan.token('id', function getId(req) {
    return req.id
})

router.use(Middleware.uuid)
router.use(morgan(':date[iso] | :status | :response-time ms | :remote-addr | :method :url '))
router.use(Middleware.error)

router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)
router.get('/auth/validate', Middleware.auth, AuthController.validate)

router.get('/discussions', Middleware.auth, DiscussionController.index)
router.get('/discussions/:id', Middleware.auth, DiscussionController.show)
router.post('/discussions', Middleware.auth, DiscussionController.store)
router.post('/discussions/:id/save', Middleware.auth, DiscussionController.saveDiscussion)
router.put('/discussions/:id', Middleware.auth, DiscussionController.update)
router.delete('/discussions/:id', Middleware.auth, DiscussionController.destroy)
router.post('/discussions/:id/score', Middleware.auth, DiscussionController.score)
router.delete('/discussions/:id/score', Middleware.auth, DiscussionController.deleteScore)

router.get('/replies', Middleware.auth, ReplyController.index)
router.get('/replies/:id', Middleware.auth, ReplyController.show)
router.post('/replies', Middleware.auth, ReplyController.store)
router.put('/replies/:id', Middleware.auth, ReplyController.update)
router.delete('/replies/:id', Middleware.auth, ReplyController.destroy)
router.post('/replies/:id/score', Middleware.auth, ReplyController.score)
router.delete('/replies/:id/score', Middleware.auth, ReplyController.deleteScore)

router.get('/communities', Middleware.auth, CommunityController.index)
router.get('/communities/:id', Middleware.auth, CommunityController.show)
router.post('/communities', Middleware.auth, CommunityController.store)
router.put('/communities/:id', Middleware.auth, CommunityController.update)
router.delete('/communities/:id', Middleware.auth, CommunityController.destroy)
router.post('/communities/:id/join', Middleware.auth, CommunityController.join)
router.post('/communities/:id/leave', Middleware.auth, CommunityController.leave)

export default router