"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJudgeModel = exports.Judge = void 0;
const sequelize_1 = require("sequelize");
class Judge extends sequelize_1.Model {
}
exports.Judge = Judge;
function initJudgeModel(sequelize) {
    Judge.init({
        judge_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        nationality: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Judge',
    });
}
exports.initJudgeModel = initJudgeModel;
