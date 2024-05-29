import { Router } from 'express'
import * as AuthController from '../controllers/authController.js'
import * as DiscussionController from '../controllers/discussionController.js'
import * as ReplyController from '../controllers/replyController.js'
import * as SubjectController from '../controllers/subjectController.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)
router.get('/auth/validate', auth, AuthController.validate)

router.get('/discussions', auth, DiscussionController.index)
router.get('/discussions/:id', auth, DiscussionController.show)
router.post('/discussions', auth, DiscussionController.store)
router.put('/discussions/:id', auth, DiscussionController.update)
router.delete('/discussions/:id', auth, DiscussionController.destroy)
router.post('/discussions/:id/score', auth, DiscussionController.score)
router.delete('/discussions/:id/score', auth, DiscussionController.deleteScore)

router.get('/replies', auth, ReplyController.index)
router.get('/replies/:id', auth, ReplyController.show)
router.post('/replies', auth, ReplyController.store)
router.put('/replies/:id', auth, ReplyController.update)
router.delete('/replies/:id', auth, ReplyController.destroy)
router.post('/replies/:id/score', auth, ReplyController.score)
router.delete('/replies/:id/score', auth, ReplyController.deleteScore)

router.get('/subjects', auth, SubjectController.index)
router.get('/subjects/:id', auth, SubjectController.show)
router.post('/subjects', auth, SubjectController.store)
router.put('/subjects/:id', auth, SubjectController.update)
router.delete('/subjects/:id', auth, SubjectController.destroy)
router.post('/subjects/:id/enroll', auth, SubjectController.enroll)

export default router