"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateModels = void 0;
const fight_1 = require("./models/fight");
const fighter_1 = require("./models/fighter");
const event_1 = require("./models/event");
const judge_1 = require("./models/judge");
const fight_judge_1 = require("./models/fight_judge");
function associateModels() {
    fight_1.Fight.belongsTo(event_1.Event, { foreignKey: 'event_id' });
    fight_1.Fight.belongsTo(fighter_1.Fighter, { foreignKey: 'fighter1_id', as: 'fighter1' });
    fight_1.Fight.belongsTo(fighter_1.Fighter, { foreignKey: 'fighter2_id', as: 'fighter2' });
    event_1.Event.hasMany(fight_1.Fight, { foreignKey: 'event_id' });
    fighter_1.Fighter.hasMany(fight_1.Fight, { foreignKey: 'fighter1_id' });
    fighter_1.Fighter.hasMany(fight_1.Fight, { foreignKey: 'fighter2_id' });
    fight_1.Fight.hasMany(fight_judge_1.Fight_Judge, { foreignKey: 'fight_id' });
    judge_1.Judge.hasMany(fight_judge_1.Fight_Judge, { foreignKey: 'judge_id' });
    fight_judge_1.Fight_Judge.belongsTo(fight_1.Fight, { foreignKey: 'fight_id' });
    fight_judge_1.Fight_Judge.belongsTo(judge_1.Judge, { foreignKey: 'judge_id' });
}
exports.associateModels = associateModels;
