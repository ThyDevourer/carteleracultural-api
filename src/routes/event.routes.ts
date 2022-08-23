import { Router } from 'express'
import {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent
} from '../controllers/event.controller'
import { addEventValidator, updateEventValidator } from '../validators/event.validator'
import { authMiddleware, roleCheckMiddleware } from '../middlewares/auth.middleware'

const eventRouter = Router()

eventRouter.get('/', getEvents)
eventRouter.get('/:_id', getEvent)
eventRouter.post(
  '/',
  authMiddleware,
  roleCheckMiddleware(['admin', 'super']),
  addEventValidator,
  addEvent
)
eventRouter.put(
  '/:_id',
  authMiddleware,
  roleCheckMiddleware(['normal', 'admin', 'super']),
  updateEventValidator,
  updateEvent
)
eventRouter.delete(
  '/:_id',
  authMiddleware,
  roleCheckMiddleware(['normal', 'admin', 'super']),
  deleteEvent
)

export default eventRouter
