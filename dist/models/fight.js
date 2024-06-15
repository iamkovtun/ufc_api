"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFightModel = exports.Fight = void 0;
const sequelize_1 = require("sequelize");
const event_1 = require("./event");
const fighter_1 = require("./fighter");
class Fight extends sequelize_1.Model {
}
exports.Fight = Fight;
function initFightModel(sequelize) {
    Fight.init({
        fight_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        event_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: event_1.Event,
                key: 'event_id',
            },
        },
        fighter1_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: fighter_1.Fighter,
                key: 'fighter_id',
            },
        },
        fighter2_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: fighter_1.Fighter,
                key: 'fighter_id',
            },
        },
        weight_class: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        rounds: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        result: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        method: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        round_end: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        time_end: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: false,
        },
    }, { sequelize, modelName: 'Fight' });
}
exports.initFightModel = initFightModel;
