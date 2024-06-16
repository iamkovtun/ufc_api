import { Router } from 'express';
import { getAllFighters, createFighter, updateFighter, deleteFighter, getFighterById, getFighterRecord, getFighterFullRecord } from '../controllers/fighterController';

const router: Router = Router();

router.get('/:fighter_id/full-record', getFighterFullRecord);

router.get('/:fighter_id/record', getFighterRecord);

router.get('/', getAllFighters);

router.get('/:fighter_id', getFighterById);

router.post('/', createFighter);

router.put('/:fighter_id', updateFighter);

router.delete('/:fighter_id', deleteFighter);

export default router;
