"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFighter_FightModel = exports.Fighter_Fight = void 0;
const sequelize_1 = require("sequelize");
const fight_1 = require("./fight");
const fighter_1 = require("./fighter");
class Fighter_Fight extends sequelize_1.Model {
}
exports.Fighter_Fight = Fighter_Fight;
function initFighter_FightModel(sequelize) {
    Fighter_Fight.init({
        fight_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: fight_1.Fight,
                key: 'fight_id',
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
    }, {
        sequelize,
        modelName: 'Fighter_Fight',
    });
}
exports.initFighter_FightModel = initFighter_FightModel;
