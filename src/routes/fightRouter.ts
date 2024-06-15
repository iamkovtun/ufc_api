import { Router } from 'express';
import { getAllFights, createFight, updateFight, deleteFight, getFightById } from '../controllers/fightController';

const router: Router = Router();

router.get('/', getAllFights);

router.get('/:fight_id', getFightById);

router.post('/', createFight);

router.put('/:fight_id', updateFight);

router.delete('/:fight_id', deleteFight);

export default router;
