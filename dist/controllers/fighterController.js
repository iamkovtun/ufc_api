"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFighter = exports.updateFighter = exports.createFighter = exports.getFighterById = exports.getAllFighters = exports.getFighterRecord = exports.getFighterFullRecord = void 0;
const fighter_1 = require("../models/fighter");
const fight_1 = require("../models/fight");
const fighter_fight_1 = require("../models/fighter_fight");
const sequelize_1 = require("sequelize");
const event_1 = require("../models/event");
const fight_judge_1 = require("../models/fight_judge");
const getFighterFullRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getResult = (fight, fighterId) => {
        if (fight.winner_id === Number(fighterId)) {
            return "Win";
        }
        else if (fight.winner_id !== Number(fighterId) && fight.winner_id !== null) {
            return "Loss";
        }
        else if (fight.winner_id === null) {
            if (fight.method === 'Draw') {
                return "Draw";
                ;
            }
            else if (fight.method === 'No Contest') {
                return "No Contest";
                ;
            }
        }
        return 'no data';
    };
    const fighterId = req.params.fighter_id;
    try {
        const fights = yield fight_1.Fight.findAll({
            include: [{
                    model: fighter_1.Fighter,
                    attributes: [],
                    through: { attributes: [] },
                    where: { fighter_id: fighterId }
                }]
        });
        let fullRecord = [];
        for (const fight of fights) {
            const opponent = yield fighter_fight_1.Fighter_Fight.findOne({
                where: {
                    fight_id: fight.fight_id,
                    fighter_id: { [sequelize_1.Op.ne]: fighterId }
                }
            });
            const event = yield event_1.Event.findOne({
                where: { event_id: fight.event_id }
            });
            const scorecards = yield fight_judge_1.Fight_Judge.findAll({
                where: {
                    fight_id: fight.fight_id,
                    fighter_id: fighterId,
                }
            });
            const fightRecord = {
                fight_id: fight.fight_id,
                opponent_id: (opponent === null || opponent === void 0 ? void 0 : opponent.fighter_id) || null,
                weight_class: fight.weight_class,
                time_end: fight.time_end,
                round_end: fight.round_end,
                scorecards: scorecards || null,
                event_name: (event === null || event === void 0 ? void 0 : event.event_name) || null,
                method: fight.method,
                result: getResult(fight, fighterId)
            };
            fullRecord.push(fightRecord);
        }
        res.json({ fullRecord });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getFighterFullRecord = getFighterFullRecord;
const getFighterRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fighterId = req.params.fighter_id;
    try {
        const fights = yield fight_1.Fight.findAll();
        let wins = 0, losses = 0, draws = 0, noContests = 0;
        fights.forEach(fight => {
            if (fight.winner_id === Number(fighterId)) {
                wins++;
            }
            else if (fight.winner_id !== Number(fighterId) && fight.winner_id !== null) {
                losses++;
            }
            else if (fight.winner_id === null) {
                if (fight.method === 'Draw') {
                    draws++;
                }
                else if (fight.method === 'No Contest') {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getFighterRecord = getFighterRecord;
const getAllFighters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    const fighters = yield fighter_1.Fighter.findAll({ where: filters });
    res.json(fighters);
});
exports.getAllFighters = getAllFighters;
const getFighterById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fighter_id } = req.params;
    const fighter = yield fighter_1.Fighter.findByPk(fighter_id);
    if (fighter) {
        res.json(fighter);
    }
    else {
        res.status(404).send('Fighter not found');
    }
});
exports.getFighterById = getFighterById;
const createFighter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAttributes = req.body;
    const fighter = yield fighter_1.Fighter.create(Object.assign({}, createdAttributes));
    res.json(fighter);
});
exports.createFighter = createFighter;
const updateFighter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fighter_id } = req.params;
    const updatedAttributes = req.body;
    const fighter = yield fighter_1.Fighter.findByPk(fighter_id);
    if (fighter) {
        Object.assign(fighter, updatedAttributes);
        yield fighter.save();
        res.json(fighter);
    }
    else {
        res.status(404).send('Fighter not found');
    }
});
exports.updateFighter = updateFighter;
const deleteFighter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fighter_id } = req.params;
    const fighter = yield fighter_1.Fighter.findByPk(fighter_id);
    if (fighter) {
        yield fighter.destroy();
        res.status(204).send();
    }
    else {
        res.status(404).send('Fighter not found');
    }
});
exports.deleteFighter = deleteFighter;
