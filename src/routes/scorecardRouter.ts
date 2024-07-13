import { Router } from 'express';
import { getAllScorecard, createScorecard, updateScorecard, deleteScorecard, getScorecardById } from '../controllers/scorecardController';

const router: Router = Router();

router.get('/', getAllScorecard);

router.get('/:scorecard_id', getScorecardById);

router.post('/', createScorecard);

router.put('/:scorecard_id', updateScorecard);

router.delete('/:scorecard_id', deleteScorecard);

export default router;
