import { Request, Response } from 'express';
import { Fighter } from '../models/fighter';

interface FighterRequest extends Request {
    body: {
        first_name: string;
        last_name: string;
        nickname: string;
        birthdate: string;
        nationality: string;
        height: number;
        weight: number;
        reach: number;
        stance: string;
        record_wins: number;
        record_losses: number;
        record_draws: number;
        record_no_contests: number;
    };
    params: {
        fighter_id: string;
    };
}

export const getAllFighters = async (req: Request, res: Response): Promise<void> => {
    const filters = req.query; // Optional filters can be accessed using req.query
    const fighters = await Fighter.findAll({ where: filters });
    res.json(fighters);
};

export const getFighterById = async (req: FighterRequest, res: Response): Promise<void> => {
    const { fighter_id } = req.params;
    const fighter = await Fighter.findByPk(fighter_id);
    if (fighter) {
        res.json(fighter);
    } else {
        res.status(404).send('Fighter not found');
    }
};

export const createFighter = async (req: FighterRequest, res: Response): Promise<void> => {
    const createdAttributes = req.body;
    const fighter = await Fighter.create({
        ...createdAttributes
    });
    res.json(fighter);
};

export const updateFighter = async (req: FighterRequest, res: Response): Promise<void> => {
    const { fighter_id } = req.params;
    const updatedAttributes = req.body;
    const fighter = await Fighter.findByPk(fighter_id);
    if (fighter) {
        Object.assign(fighter, updatedAttributes);
        await fighter.save();
        res.json(fighter);
    } else {
        res.status(404).send('Fighter not found');
    }
};

export const deleteFighter = async (req: FighterRequest, res: Response): Promise<void> => {
    const { fighter_id } = req.params;
    const fighter = await Fighter.findByPk(fighter_id);
    if (fighter) {
        await fighter.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Fighter not found');
    }
};
