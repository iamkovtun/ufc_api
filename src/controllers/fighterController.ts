import { Request, Response } from 'express';
import { Fighter } from '../models/fighter';
import { Fight } from '../models/fight';
import { Fighter_Fight } from '../models/fighter_fight';
import { where } from 'sequelize';

interface FighterRequest extends Request {
    body: {
        first_name: string;
        last_name: string;
        nickname: string;
        birthdate: string;
        nationality: string;
        height: number;
        reach: number;
        stance: string;

    };
    params: {
        fighter_id: string;
    };
}

interface FighterRecord {
    fight_id: number;
    //fighter_id: number;
    weight_class: string;
    time_end: Date;
    round_end: number;
    //scorecards: number;
    //event_name: string;
    method: string;
    result: string;
}



export const getFighterFullRecord = async (req: FighterRequest, res: Response): Promise<void> => {

    const getResult =  (fight: Fight, fighterId : string): string => {

        if (fight.winner_id === Number(fighterId)) {
            return "Win";
        } else if (fight.winner_id !== Number(fighterId) && fight.winner_id !== null) {
            return "Loss";
        } else if (fight.winner_id === null) {
            if (fight.method === 'Draw') {
                return "Draw";;
            } else if (fight.method === 'No Contest') {
                return "No Contest";;
            }
        }
        return 'no data';
    }

    

    const fighterId = req.params.fighter_id;

    try {
        const fights = await Fight.findAll({
            include: [{
                model: Fighter,
                attributes: [], // Don't include any attributes from the Fighter model
                through: { attributes: [] }, // Don't include attributes from the join table
                where: { fighter_id: fighterId }
            }]
        });
        
        let fullRecord: FighterRecord[] = []

        fights.forEach(fight => {
            const fightRecord: FighterRecord = {
                fight_id: fight.fight_id,
                //fighter_id: ???
                weight_class: fight.weight_class,
                time_end: fight.time_end,
                round_end: fight.round_end,
                //scorecards: ???
                //event_name: ???
                method: fight.method,
                result: getResult(fight, fighterId)
            };
            fullRecord.push(fightRecord)
        });

        res.json({fullRecord});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getFighterRecord = async (req: FighterRequest, res: Response): Promise<void> => {

            const fighterId = req.params.fighter_id;
        
            try {
                const fights = await Fight.findAll();
        
                let wins = 0, losses = 0, draws = 0, noContests = 0;
        
                fights.forEach(fight => {
                    if (fight.winner_id === Number(fighterId)) {
                        wins++;
                    } else if (fight.winner_id !== Number(fighterId) && fight.winner_id !== null) {
                        losses++;
                    } else if (fight.winner_id === null) {
                        if (fight.method === 'Draw') {
                            draws++;
                        } else if (fight.method === 'No Contest') {
                            noContests++;
                        }
        
                    }
                });
        
                res.json({
                    wins,
                    losses,
                    draws,
                    noContests
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        };

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
