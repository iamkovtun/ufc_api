"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFight_JudgeModel = exports.Fight_Judge = void 0;
const sequelize_1 = require("sequelize");
const fight_1 = require("./fight");
const judge_1 = require("./judge");
class Fight_Judge extends sequelize_1.Model {
}
exports.Fight_Judge = Fight_Judge;
function initFight_JudgeModel(sequelize) {
    Fight_Judge.init({
        fight_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: fight_1.Fight,
                key: 'fight_id',
            },
        },
        judge_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: judge_1.Judge,
                key: 'judge_id',
            },
        },
        score_fighter1: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        score_fighter2: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, { sequelize,
        name: {
            singular: 'Fight_Judge',
            plural: 'Fight_Judges'
        } });
}
exports.initFight_JudgeModel = initFight_JudgeModel;
