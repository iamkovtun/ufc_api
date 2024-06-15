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
exports.deleteFight = exports.updateFight = exports.createFight = exports.getFightById = exports.getAllFights = void 0;
const fight_1 = require("../models/fight");
const getAllFights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query; // Optional filters can be accessed using req.query
    const fights = yield fight_1.Fight.findAll({ where: filters });
    res.json(fights);
});
exports.getAllFights = getAllFights;
const getFightById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fight_id } = req.params;
    const fight = yield fight_1.Fight.findByPk(fight_id);
    if (fight) {
        res.json(fight);
    }
    else {
        res.status(404).send('Fight not found');
    }
});
exports.getFightById = getFightById;
const createFight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAttributes = req.body;
    const fight = yield fight_1.Fight.create(Object.assign({}, createdAttributes));
    res.json(fight);
});
exports.createFight = createFight;
const updateFight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fight_id } = req.params;
    const updatedAttributes = req.body;
    const fight = yield fight_1.Fight.findByPk(fight_id);
    if (fight) {
        Object.assign(fight, updatedAttributes);
        yield fight.save();
        res.json(fight);
    }
    else {
        res.status(404).send('Fight not found');
    }
});
exports.updateFight = updateFight;
const deleteFight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fight_id } = req.params;
    const fight = yield fight_1.Fight.findByPk(fight_id);
    if (fight) {
        yield fight.destroy();
        res.status(204).send();
    }
    else {
        res.status(404).send('Fight not found');
    }
});
exports.deleteFight = deleteFight;
