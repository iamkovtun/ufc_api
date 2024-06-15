"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEventModel = exports.Event = void 0;
const sequelize_1 = require("sequelize");
class Event extends sequelize_1.Model {
}
exports.Event = Event;
function initEventModel(sequelize) {
    Event.init({
        event_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        event_name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        venue: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        attendance: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, { sequelize, modelName: 'Event' });
}
exports.initEventModel = initEventModel;
