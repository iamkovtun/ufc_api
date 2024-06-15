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
exports.deleteFighter = exports.updateFighter = exports.createFighter = exports.getFighterById = exports.getAllFighters = void 0;
const fighter_1 = require("../models/fighter");
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
