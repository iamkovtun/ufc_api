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
exports.deleteJudge = exports.updateJudge = exports.createJudge = exports.getJudgeById = exports.getAllJudges = void 0;
const judge_1 = require("../models/judge");
const getAllJudges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query; // Optional filters can be accessed using req.query
    const judges = yield judge_1.Judge.findAll({ where: filters });
    res.json(judges);
});
exports.getAllJudges = getAllJudges;
const getJudgeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { judge_id } = req.params;
    const judge = yield judge_1.Judge.findByPk(judge_id);
    if (judge) {
        res.json(judge);
    }
    else {
        res.status(404).send('Judge not found');
    }
});
exports.getJudgeById = getJudgeById;
const createJudge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, nationality } = req.body;
    const judge = yield judge_1.Judge.create({
        first_name,
        last_name,
        nationality
    });
    res.json(judge);
});
exports.createJudge = createJudge;
const updateJudge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { judge_id } = req.params;
    const updatedAttributes = req.body;
    const judge = yield judge_1.Judge.findByPk(judge_id);
    if (judge) {
        Object.assign(judge, updatedAttributes);
        yield judge.save();
        res.json(judge);
    }
    else {
        res.status(404).send('Judge not found');
    }
});
exports.updateJudge = updateJudge;
const deleteJudge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { judge_id } = req.params;
    const judge = yield judge_1.Judge.findByPk(judge_id);
    if (judge) {
        yield judge.destroy();
        res.status(204).send();
    }
    else {
        res.status(404).send('Judge not found');
    }
});
exports.deleteJudge = deleteJudge;
