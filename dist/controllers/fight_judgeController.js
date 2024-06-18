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
exports.deleteFightJudge = exports.updateFightJudge = exports.createFightJudge = exports.getFightJudgeById = exports.getAllFightJudges = void 0;
const fight_judge_1 = require("../models/fight_judge");
const getAllFightJudges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query; // Optional filters can be accessed using req.query
    const fightJudges = yield fight_judge_1.Fight_Judge.findAll({ where: filters });
    res.json(fightJudges);
});
exports.getAllFightJudges = getAllFightJudges;
const getFightJudgeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fight_judge_id } = req.params;
    const fightJudge = yield fight_judge_1.Fight_Judge.findByPk(fight_judge_id);
    if (fightJudge) {
        res.json(fightJudge);
    }
    else {
        res.status(404).send('Fight Judge not found');
    }
});
exports.getFightJudgeById = getFightJudgeById;
const createFightJudge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAttributes = req.body;
    const fightJudge = yield fight_judge_1.Fight_Judge.create(Object.assign({}, createdAttributes));
    res.json(fightJudge);
});
exports.createFightJudge = createFightJudge;
const updateFightJudge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fight_judge_id } = req.params;
    const updatedAttributes = req.body;
    const fightJudge = yield fight_judge_1.Fight_Judge.findByPk(fight_judge_id);
    if (fightJudge) {
        Object.assign(fightJudge, updatedAttributes);
        yield fightJudge.save();
        res.json(fightJudge);
    }
    else {
        res.status(404).send('Fight Judge not found');
    }
});
exports.updateFightJudge = updateFightJudge;
const deleteFightJudge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fight_judge_id } = req.params;
    const fightJudge = yield fight_judge_1.Fight_Judge.findByPk(fight_judge_id);
    if (fightJudge) {
        yield fightJudge.destroy();
        res.status(204).send();
    }
    else {
        res.status(404).send('Fight Judge not found');
    }
});
exports.deleteFightJudge = deleteFightJudge;
