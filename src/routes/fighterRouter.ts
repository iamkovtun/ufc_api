import { Router } from 'express';
import { getAllFighters, createFighter, updateFighter, deleteFighter, getFighterById } from '../controllers/fighterController';

const router: Router = Router();

router.get('/', getAllFighters);

router.get('/:fighter_id', getFighterById);

router.post('/', createFighter);

router.put('/:fighter_id', updateFighter);

router.delete('/:fighter_id', deleteFighter);

export default router;
