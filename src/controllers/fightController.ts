import { Request, Response } from 'express';
import { Fight } from '../models/fight';

interface FightRequest extends Request {
    body: {
        event_id: string;
        fighter1_id: string;
        fighter2_id: string;
        weight_class: string;
        rounds: number;
        result: string;
        method: string;
        round_end: number;
        time_end: string;
    };
    params: {
        fight_id: string;
    };
}

export const getAllFights = async (req: Request, res: Response): Promise<void> => {
    const filters = req.query; // Optional filters can be accessed using req.query
    const fights = await Fight.findAll({ where: filters });
    res.json(fights);
};

export const getFightById = async (req: FightRequest, res: Response): Promise<void> => {
    const { fight_id } = req.params;
    const fight = await Fight.findByPk(fight_id);
    if (fight) {
        res.json(fight);
    } else {
        res.status(404).send('Fight not found');
    }
};

export const createFight = async (req: FightRequest, res: Response): Promise<void> => {
    const createdAttributes = req.body;
    const fight = await Fight.create({
        ...createdAttributes
    });
    res.json(fight);
};

export const updateFight = async (req: FightRequest, res: Response): Promise<void> => {
    const { fight_id } = req.params;
    const updatedAttributes = req.body;
    const fight = await Fight.findByPk(fight_id);
    if (fight) {
        Object.assign(fight, updatedAttributes);
        await fight.save();
        res.json(fight);
    } else {
        res.status(404).send('Fight not found');
    }
};

export const deleteFight = async (req: FightRequest, res: Response): Promise<void> => {
    const { fight_id } = req.params;
    const fight = await Fight.findByPk(fight_id);
    if (fight) {
        await fight.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Fight not found');
    }
};
