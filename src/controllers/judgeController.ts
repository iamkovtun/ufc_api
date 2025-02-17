import { Request, Response } from 'express';
import { Judge } from '../models/judge';
import {Fight} from '../models/fight';
import {Scorecard} from '../models/scorecard';

interface JudgeRequest extends Request {
    body: {
        first_name: string;
        last_name: string;
        nationality: string;
    };
    params: {
        judge_id: string;
    };
    query: {
        first_name: string;
        last_name: string;
        nationality: string;
    };
}

export const getAllJudges = async (req: Request, res: Response): Promise<void> => {
    const filters = req.query; // Optional filters can be accessed using req.query
    const judges: Judge[] = await Judge.findAll({ where: filters });
    res.json(judges);
};

export const getJudgeById = async (req: JudgeRequest, res: Response): Promise<void> => {
    const { judge_id } = req.params;
    const judge: Judge | null = await Judge.findByPk(judge_id);
    if (judge) {
        res.json(judge);
    } else {
        res.status(404).send('Judge not found');
    }
};

export const createJudge = async (req: JudgeRequest, res: Response): Promise<void> => {
    const { first_name, last_name, nationality } = req.body;
    const judge: Judge = await Judge.create({
        first_name,
        last_name,
        nationality
    });
    res.json(judge);
};

export const updateJudge = async (req: JudgeRequest, res: Response): Promise<void> => {
    const { judge_id } = req.params;
    const updatedAttributes = req.body;
    const judge: Judge | null = await Judge.findByPk(judge_id);
    if (judge) {
        Object.assign(judge, updatedAttributes);
        await judge.save();
        res.json(judge);
    } else {
        res.status(404).send('Judge not found');
    }
};

export const deleteJudge = async (req: JudgeRequest, res: Response): Promise<void> => {
    const { judge_id } = req.params;
    const judge: Judge | null = await Judge.findByPk(judge_id);
    if (judge) {
        await judge.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Judge not found');
    }
};

export const getAllFightsOfJudge = async (req: JudgeRequest, res: Response): Promise<void> => {
    const { judge_id } = req.params;
    const fights = await Fight.findAll({
        include: [{
            model: Scorecard,
            required: true,
            attributes: [],
            include: [{
                model: Judge,
                where: { judge_id },
                attributes: []
            }]
        }]
    });
    if (fights.length === 0) {
        res.status(404).send('Fights not found');
    } else {
        res.json(fights);
    }
} 
