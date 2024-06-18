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
exports.deleteFighterFight = exports.updateFighterFight = exports.createFighterFight = exports.getFighterFightById = exports.getAllFighterFights = void 0;
const fighter_fight_1 = require("../models/fighter_fight");
const getAllFighterFights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    const fighterFights = yield fighter_fight_1.Fighter_Fight.findAll({ where: filters });
    res.json(fighterFights);
});
exports.getAllFighterFights = getAllFighterFights;
const getFighterFightById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fighter_fight_id } = req.params;
    const fighterFight = yield fighter_fight_1.Fighter_Fight.findByPk(fighter_fight_id);
    if (fighterFight) {
        res.json(fighterFight);
    }
    else {
        res.status(404).send('Fighter Fight not found');
    }
});
exports.getFighterFightById = getFighterFightById;
const createFighterFight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAttributes = req.body;
    const fighterFight = yield fighter_fight_1.Fighter_Fight.create(Object.assign({}, createdAttributes));
    res.json(fighterFight);
});
exports.createFighterFight = createFighterFight;
const updateFighterFight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fighter_fight_id } = req.params;
    const updatedAttributes = req.body;
    const fighterFight = yield fighter_fight_1.Fighter_Fight.findByPk(fighter_fight_id);
    if (fighterFight) {
        Object.assign(fighterFight, updatedAttributes);
        yield fighterFight.save();
        res.json(fighterFight);
    }
    else {
        res.status(404).send('Fighter Fight not found');
    }
});
exports.updateFighterFight = updateFighterFight;
const deleteFighterFight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fighter_fight_id } = req.params;
    const fighterFight = yield fighter_fight_1.Fighter_Fight.findByPk(fighter_fight_id);
    if (fighterFight) {
        yield fighterFight.destroy();
        res.status(204).send();
    }
    else {
        res.status(404).send('Fighter Fight not found');
    }
});
exports.deleteFighterFight = deleteFighterFight;
