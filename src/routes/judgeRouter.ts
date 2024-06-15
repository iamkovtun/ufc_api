import { Router } from 'express';
import { getAllJudges, createJudge, updateJudge, deleteJudge, getJudgeById } from '../controllers/judgeController';

const router: Router = Router();

router.get('/', getAllJudges);

router.get('/:judge_id', getJudgeById);

router.post('/', createJudge);

router.put('/:judge_id', updateJudge);

router.delete('/:judge_id', deleteJudge);

export default router;
