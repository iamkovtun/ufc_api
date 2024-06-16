"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFighterModel = exports.Fighter = void 0;
const sequelize_1 = require("sequelize");
class Fighter extends sequelize_1.Model {
}
exports.Fighter = Fighter;
function initFighterModel(sequelize) {
    Fighter.init({
        fighter_id: {
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
        nickname: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: true,
        },
        birthdate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        nationality: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: true,
        },
        height: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
        reach: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
        stance: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: true,
        },
    }, { sequelize, modelName: 'Fighter' });
}
exports.initFighterModel = initFighterModel;
