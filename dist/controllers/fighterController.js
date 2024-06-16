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
const getFighterFullRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getResult = (fight, fighterId) => {
        if (fight.winner_id === Number(fighterId)) {
            return "win";
        }
        else if (fight.winner_id !== Number(fighterId) && fight.winner_id !== null) {
            return "loss";
        }
        else if (fight.winner_id === null) {
            if (fight.method === 'draw') {
                return "draw";
                ;
            }
            else if (fight.method === 'no contests') {
                return "no contests";
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
                    attributes: [], // Don't include any attributes from the Fighter model
                    through: { attributes: [] }, // Don't include attributes from the join table
                    where: { fighter_id: fighterId }
                }]
        });
        let fullRecord = [];
        fights.forEach(fight => {
            const fightRecord = {
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
            fullRecord.push(fightRecord);
        });
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
                if (fight.method === 'draw') {
                    draws++;
                }
                else if (fight.method === 'no contests') {
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
    const filters = req.query; // Optional filters can be accessed using req.query
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
