import { Request, Response } from 'express';
import { Fight_Judge } from '../models/fight_judge';

interface FightJudgeRequest extends Request {
    body: {
        fight_id: number;
        judge_id: number;
        fighter_id: number;
        score: number;
    };
    params: {
        fight_judge_id: string;
    };
    query: {
        fight_id: string;
        judge_id: string;
        fighter_id: string;
        score: string;
    };
}

export const getAllFightJudges = async (req: Request, res: Response): Promise<void> => {
    const filters = req.query; // Optional filters can be accessed using req.query
    const fightJudges:Fight_Judge[] = await Fight_Judge.findAll({ where: filters });
    res.json(fightJudges);
};

export const getFightJudgeById = async (req: FightJudgeRequest, res: Response): Promise<void> => {
    const { fight_judge_id } = req.params;
    const fightJudge:Fight_Judge | null = await Fight_Judge.findByPk(fight_judge_id);
    if (fightJudge) {
        res.json(fightJudge);
    } else {
        res.status(404).send('Fight Judge not found');
    }
};

export const createFightJudge = async (req: FightJudgeRequest, res: Response): Promise<void> => {
    const createdAttributes = req.body;
    const fightJudge:Fight_Judge = await Fight_Judge.create({
        ...createdAttributes
    });
    res.json(fightJudge);
};

export const updateFightJudge = async (req: FightJudgeRequest, res: Response): Promise<void> => {
    const { fight_judge_id } = req.params;
    const updatedAttributes = req.body;
    const fightJudge:Fight_Judge | null = await Fight_Judge.findByPk(fight_judge_id);
    if (fightJudge) {
        Object.assign(fightJudge, updatedAttributes);
        await fightJudge.save();
        res.json(fightJudge);
    } else {
        res.status(404).send('Fight Judge not found');
    }
};

export const deleteFightJudge = async (req: FightJudgeRequest, res: Response): Promise<void> => {
    const { fight_judge_id } = req.params;
    const fightJudge:Fight_Judge | null = await Fight_Judge.findByPk(fight_judge_id);
    if (fightJudge) {
        await fightJudge.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Fight Judge not found');
    }
};
