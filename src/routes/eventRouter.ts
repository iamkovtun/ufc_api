import { Router } from 'express';
import { getAllEvents, createEvent, updateEvent, deleteEvent, getEventById } from '../controllers/eventController';

const router: Router = Router();

router.get('/', getAllEvents);

router.get('/:event_id', getEventById);

router.post('/', createEvent);

router.put('/:event_id', updateEvent);

router.delete('/:event_id', deleteEvent);

export default router;
