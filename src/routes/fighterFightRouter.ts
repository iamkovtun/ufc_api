import { Router } from 'express';
import { getAllFighterFights, createFighterFight, updateFighterFight, deleteFighterFight, getFighterFightById } from '../controllers/fighter_fightController';

const router: Router = Router();

router.get('/', getAllFighterFights);

router.get('/:fighter_fight_id', getFighterFightById);

router.post('/', createFighterFight);

router.put('/:fighter_fight_id', updateFighterFight);

router.delete('/:fighter_fight_id', deleteFighterFight);

export default router;
