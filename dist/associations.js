"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateModels = void 0;
const fight_1 = require("./models/fight");
const fighter_1 = require("./models/fighter");
const event_1 = require("./models/event");
const judge_1 = require("./models/judge");
const fight_judge_1 = require("./models/fight_judge");
const fighter_fight_1 = require("./models/fighter_fight");
function associateModels() {
    event_1.Event.hasMany(fight_1.Fight, { foreignKey: 'event_id' });
    fight_1.Fight.belongsTo(event_1.Event, { foreignKey: 'event_id' });
    fight_1.Fight.belongsToMany(fighter_1.Fighter, { through: fighter_fight_1.Fighter_Fight, foreignKey: 'fight_id' });
    fighter_1.Fighter.belongsToMany(fight_1.Fight, { through: fighter_fight_1.Fighter_Fight, foreignKey: 'fighter_id' });
    fight_1.Fight.belongsToMany(judge_1.Judge, { through: fight_judge_1.Fight_Judge, foreignKey: 'fight_id' });
    judge_1.Judge.belongsToMany(fight_1.Fight, { through: fight_judge_1.Fight_Judge, foreignKey: 'judge_id' });
    fight_1.Fight.belongsTo(fighter_1.Fighter, { as: 'Winner', foreignKey: 'winner_id' });
    fight_judge_1.Fight_Judge.belongsTo(fighter_1.Fighter, { foreignKey: 'fighter_id' });
}
exports.associateModels = associateModels;
