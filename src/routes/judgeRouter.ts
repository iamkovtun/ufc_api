import { Router } from 'express';
import { getAllJudges, createJudge, updateJudge, deleteJudge, getJudgeById, getAllFightsOfJudge } from '../controllers/judgeController';

const router: Router = Router();

router.get('/', getAllJudges);

router.get('/:judge_id', getJudgeById);

router.post('/', createJudge);

router.put('/:judge_id', updateJudge);

router.delete('/:judge_id', deleteJudge);

router.get('/:judge_id/fights', getAllFightsOfJudge);

export default router;
