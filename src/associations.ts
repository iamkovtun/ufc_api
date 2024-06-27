import {Fight} from "./models/fight"
import {Fighter} from "./models/fighter"
import {Event} from "./models/event"
import {Judge} from "./models/judge"
import {Scorecard } from "./models/scorecard"
import {Fighter_Fight} from "./models/fighter_fight"



export function associateModels() {
    Event.hasMany(Fight, { foreignKey: 'event_id' });
    Fight.belongsTo(Event, { foreignKey: 'event_id' });
    
    Fight.belongsToMany(Fighter, { through: Fighter_Fight, foreignKey: 'fight_id' });
    Fighter.belongsToMany(Fight, { through: Fighter_Fight, foreignKey: 'fighter_id' });
    
    Fight.belongsToMany(Judge, { through: Scorecard , foreignKey: 'fight_id' });
    Judge.belongsToMany(Fight, { through: Scorecard , foreignKey: 'judge_id' });
    
    Fight.belongsTo(Fighter, { as: 'Winner', foreignKey: 'winner_id' });
    Scorecard .belongsTo(Fighter, { foreignKey: 'fighter_id' });
}


  