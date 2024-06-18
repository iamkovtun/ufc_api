"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFight_JudgeModel = exports.Fight_Judge = void 0;
const sequelize_1 = require("sequelize");
const fight_1 = require("./fight");
const judge_1 = require("./judge");
const fighter_1 = require("./fighter");
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
        fighter_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: fighter_1.Fighter,
                key: 'fighter_id',
            },
        },
        score: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Fight_Judge',
        indexes: [
            {
                unique: true,
                fields: ['fight_id', 'judge_id', 'fighter_id'],
                name: 'Fight_Judges_fight_id_judge_id_fighter_id_key',
            },
        ]
    });
}
exports.initFight_JudgeModel = initFight_JudgeModel;
