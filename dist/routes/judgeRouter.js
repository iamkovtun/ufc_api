"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const judgeController_1 = require("../controllers/judgeController");
const router = (0, express_1.Router)();
router.get('/', judgeController_1.getAllJudges);
router.get('/:judge_id', judgeController_1.getJudgeById);
router.post('/', judgeController_1.createJudge);
router.put('/:judge_id', judgeController_1.updateJudge);
router.delete('/:judge_id', judgeController_1.deleteJudge);
exports.default = router;
