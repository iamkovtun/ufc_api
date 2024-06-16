import {Fight} from "./models/fight"
import {Fighter} from "./models/fighter"
import {Event} from "./models/event"
import {Judge} from "./models/judge"
import {Fight_Judge} from "./models/fight_judge"
import {Fighter_Fight} from "./models/fighter_fight"



export function associateModels() {
    Event.hasMany(Fight, { foreignKey: 'event_id' });
    Fight.belongsTo(Event, { foreignKey: 'event_id' });
    
    Fight.belongsToMany(Fighter, { through: Fighter_Fight, foreignKey: 'fight_id' });
    Fighter.belongsToMany(Fight, { through: Fighter_Fight, foreignKey: 'fighter_id' });
    
    Fight.belongsToMany(Judge, { through: Fight_Judge, foreignKey: 'fight_id' });
    Judge.belongsToMany(Fight, { through: Fight_Judge, foreignKey: 'judge_id' });
    
    Fight.belongsTo(Fighter, { as: 'Winner', foreignKey: 'winner_id' });
    Fight_Judge.belongsTo(Fighter, { foreignKey: 'fighter_id' });
}


  