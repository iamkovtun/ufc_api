import { Request, Response } from 'express';
import { Fighter_Fight } from '../models/fighter_fight';

interface FighterFightRequest extends Request {
    body: {
        fight_id: number;
        fighter_id: number;
    };
    params: {
        fighter_fight_id: string;
    };
}

export const getAllFighterFights = async (req: Request, res: Response): Promise<void> => {
    const filters = req.query; // Optional filters can be accessed using req.query
    const fighterFights = await Fighter_Fight.findAll({ where: filters });
    res.json(fighterFights);
};

export const getFighterFightById = async (req: FighterFightRequest, res: Response): Promise<void> => {
    const { fighter_fight_id } = req.params;
    const fighterFight = await Fighter_Fight.findByPk(fighter_fight_id);
    if (fighterFight) {
        res.json(fighterFight);
    } else {
        res.status(404).send('Fighter Fight not found');
    }
};

export const createFighterFight = async (req: FighterFightRequest, res: Response): Promise<void> => {
    const createdAttributes = req.body;
    const fighterFight = await Fighter_Fight.create({
        ...createdAttributes
    });
    res.json(fighterFight);
};

export const updateFighterFight = async (req: FighterFightRequest, res: Response): Promise<void> => {
    const { fighter_fight_id } = req.params;
    const updatedAttributes = req.body;
    const fighterFight = await Fighter_Fight.findByPk(fighter_fight_id);
    if (fighterFight) {
        Object.assign(fighterFight, updatedAttributes);
        await fighterFight.save();
        res.json(fighterFight);
    } else {
        res.status(404).send('Fighter Fight not found');
    }
};

export const deleteFighterFight = async (req: FighterFightRequest, res: Response): Promise<void> => {
    const { fighter_fight_id } = req.params;
    const fighterFight = await Fighter_Fight.findByPk(fighter_fight_id);
    if (fighterFight) {
        await fighterFight.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Fighter Fight not found');
    }
};
