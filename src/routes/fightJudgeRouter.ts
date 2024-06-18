import { Router } from 'express';
import { getAllFightJudges, createFightJudge, updateFightJudge, deleteFightJudge, getFightJudgeById } from '../controllers/fight_judgeController';

const router: Router = Router();

router.get('/', getAllFightJudges);

router.get('/:fight_judge_id', getFightJudgeById);

router.post('/', createFightJudge);

router.put('/:fight_judge_id', updateFightJudge);

router.delete('/:fight_judge_id', deleteFightJudge);

export default router;
