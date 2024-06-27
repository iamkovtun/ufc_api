import { Request, Response } from 'express';
import { Fighter } from '../models/fighter';
import { Fight } from '../models/fight';
import { Fighter_Fight } from '../models/fighter_fight';
import {  Op } from 'sequelize';
import { Event } from '../models/event';
import { Scorecard } from '../models/scorecard';

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
    query: {
        first_name: string;
        last_name: string;
        nickname: string;
        birthdate: string;
        nationality: string;
        height: string;
        reach: string;
        stance: string;

    };
}

interface FighterRecord {
    fight_id: number;
    opponent_id: number | null;
    weight_class: string;
    time_end: Date;
    round_end: number;
    scorecards: Scorecard[] | null;
    event_name: string | null;
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
            } else if (fight.method === 'No contest') {
                return "No contest";;
            }
        }
        return 'no data';
    }

    

    const fighterId: string = req.params.fighter_id;

    try {
        const fights: Fight[] = await Fight.findAll({
            include: [{
                model: Fighter,
                attributes: [],
                through: { attributes: [] }, 
                where: { fighter_id: fighterId }
            }]
        });

        
        let fullRecord: FighterRecord[] = []
        
        for (const fight of fights) {
            const opponent: Fighter_Fight | null = await Fighter_Fight.findOne({
                where: {
                    fight_id: fight.fight_id,
                    fighter_id: { [Op.ne]: fighterId }
                }
            });
            
            
            const event: Event | null = await Event.findOne({
                where: { event_id: fight.event_id }
            });
            
            
            const scorecards: Scorecard[] | null = await Scorecard.findAll({
                where: { 
                    fight_id: fight.fight_id,
                }
            });

           
            

            const fightRecord: FighterRecord = {
                fight_id: fight.fight_id,
                opponent_id: opponent?.fighter_id || null,
                weight_class: fight.weight_class,
                time_end: fight.time_end,
                round_end: fight.round_end,
                scorecards: scorecards || null,
                event_name: event?.event_name || null,
                method: fight.method,
                result: getResult(fight, fighterId)
            };
        
            fullRecord.push(fightRecord);
        }
        
        

        res.json({fullRecord});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getFighterRecord = async (req: FighterRequest, res: Response): Promise<void> => {
            
            const fighterId: string = req.params.fighter_id;
        
            try {
                const fights: Fight[] = await Fight.findAll();
        
                let wins:number = 0, losses:number = 0, draws:number = 0, noContests:number = 0;
        
                fights.forEach(fight => {
                    if (fight.winner_id === Number(fighterId)) {
                        wins++;
                    } else if (fight.winner_id !== Number(fighterId) && fight.winner_id !== null) {
                        losses++;
                    } else if (fight.winner_id === null) {
                        if (fight.method === 'Draw') {
                            draws++;
                        } else if (fight.method === 'No contest') {
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
    const filters = req.query;
    const fighters: Fighter[] = await Fighter.findAll({ where: filters });
    res.json(fighters);
};

export const getFighterById = async (req: FighterRequest, res: Response): Promise<void> => {
    const { fighter_id } = req.params;
    const fighter: Fighter | null = await Fighter.findByPk(fighter_id);
    if (fighter) {
        res.json(fighter);
    } else {
        res.status(404).send('Fighter not found');
    }
};

export const createFighter = async (req: FighterRequest, res: Response): Promise<void> => {
    const createdAttributes = req.body;
    const fighter: Fighter = await Fighter.create({
        ...createdAttributes
    });
    res.json(fighter);
};

export const updateFighter = async (req: FighterRequest, res: Response): Promise<void> => {
    const { fighter_id } = req.params;
    const updatedAttributes = req.body;
    const fighter: Fighter | null = await Fighter.findByPk(fighter_id);
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
    const fighter: Fighter | null = await Fighter.findByPk(fighter_id);
    if (fighter) {
        await fighter.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Fighter not found');
    }
};
