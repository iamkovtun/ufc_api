import { Request, Response } from 'express';
import { Scorecard } from '../models/scorecard';

interface ScorecardRequest extends Request {
    body: {
        fight_id: number;
        judge_id: number;
        fighter_id: number;
        score: number;
    };
    params: {
        scorecard_id: string;
    };
    query: {
        fight_id: string;
        judge_id: string;
        fighter_id: string;
        score: string;
    };
}

export const getAllScorecard = async (req: Request, res: Response): Promise<void> => {
    const filters = req.query; // Optional filters can be accessed using req.query
    const scorecard:Scorecard[] = await Scorecard.findAll({ where: filters });
    res.json(scorecard);
};

export const getScorecardById = async (req: ScorecardRequest, res: Response): Promise<void> => {
    const { scorecard_id } = req.params;
    const scorecard:Scorecard | null = await Scorecard.findByPk(scorecard_id);
    if (scorecard) {
        res.json(scorecard);
    } else {
        res.status(404).send('Fight Judge not found');
    }
};

export const createScorecard = async (req: ScorecardRequest, res: Response): Promise<void> => {
    const createdAttributes = req.body;
    const scorecard:Scorecard = await Scorecard.create({
        ...createdAttributes
    });
    res.json(scorecard);
};

export const updateScorecard = async (req: ScorecardRequest, res: Response): Promise<void> => {
    const { scorecard_id } = req.params;
    const updatedAttributes = req.body;
    const scorecard:Scorecard | null = await Scorecard.findByPk(scorecard_id);
    if (scorecard) {
        Object.assign(scorecard, updatedAttributes);
        await scorecard.save();
        res.json(scorecard);
    } else {
        res.status(404).send('Fight Judge not found');
    }
};

export const deleteScorecard = async (req: ScorecardRequest, res: Response): Promise<void> => {
    const { scorecard_id } = req.params;
    const scorecard:Scorecard | null = await Scorecard.findByPk(scorecard_id);
    if (scorecard) {
        await scorecard.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Fight Judge not found');
    }
};
