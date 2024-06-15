import {Fight} from "./models/fight"
import {Fighter} from "./models/fighter"
import {Event} from "./models/event"
import {Judge} from "./models/judge"
import {Fight_Judge} from "./models/fight_judge"



export function associateModels() {
    Fight.belongsTo(Event, { foreignKey: 'event_id' });
    Fight.belongsTo(Fighter, { foreignKey: 'fighter1_id', as: 'fighter1' });
    Fight.belongsTo(Fighter, { foreignKey: 'fighter2_id', as: 'fighter2' });
    Event.hasMany(Fight, { foreignKey: 'event_id' });
    Fighter.hasMany(Fight, { foreignKey: 'fighter1_id'});
    Fighter.hasMany(Fight, { foreignKey: 'fighter2_id'});
    Fight.hasMany(Fight_Judge, { foreignKey: 'fight_id' });
    Judge.hasMany(Fight_Judge, { foreignKey: 'judge_id' });
    Fight_Judge.belongsTo(Fight, { foreignKey: 'fight_id' });
    Fight_Judge.belongsTo(Judge, { foreignKey: 'judge_id' });
}

  