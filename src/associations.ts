import {Fight} from "./models/fight"
import {Fighter} from "./models/fighter"
import {Event} from "./models/event"
import {Judge} from "./models/judge"
import {Scorecard } from "./models/scorecard"
import {Fighter_Fight} from "./models/fighter_fight"



export function associateModels() {
    /*
    Event.hasMany(Fight, { foreignKey: 'event_id' });
    Fight.belongsTo(Event, { foreignKey: 'event_id' });
    
    Fight.belongsToMany(Fighter, { through: Fighter_Fight, foreignKey: 'fight_id' });
    Fighter.belongsToMany(Fight, { through: Fighter_Fight, foreignKey: 'fighter_id' });
    
    Fight.belongsToMany(Judge, { through: Scorecard , foreignKey: 'fight_id' });
    Judge.belongsToMany(Fight, { through: Scorecard , foreignKey: 'judge_id' });
    Fighter.hasMany(Scorecard , { foreignKey: 'fighter_id' });
    Scorecard.belongsTo(Fighter, { foreignKey: 'fighter_id' });

    Fight.belongsTo(Fighter, { as: 'Winner', foreignKey: 'winner_id' });

    Judge.hasMany(Scorecard, { foreignKey: 'judge_id' });
    Scorecard.belongsTo(Judge, { foreignKey: 'judge_id' });
    */
    // Scorecard associations
    Scorecard.belongsTo(Fight, { foreignKey: 'fight_id' });
    Scorecard.belongsTo(Judge, { foreignKey: 'judge_id' });
    Scorecard.belongsTo(Fighter, { foreignKey: 'fighter_id' });

    // Judge associations
    Judge.hasMany(Scorecard, { foreignKey: 'judge_id' });


    // Fighter associations
    Fighter.hasMany(Scorecard, { foreignKey: 'fighter_id' });
    Fighter.belongsToMany(Fight, { through: Fighter_Fight, foreignKey: 'fighter_id' });

    // Fighter_Fight associations
    // This is a junction table, so we don't need to define additional associations

    // Fight associations
    Fight.hasMany(Scorecard, { foreignKey: 'fight_id' });
    Fight.belongsTo(Event, { foreignKey: 'event_id' });
    Fight.belongsTo(Fighter, { foreignKey: 'winner_id', as: 'Winner' });
    Fight.belongsToMany(Fighter, { through: Fighter_Fight, foreignKey: 'fight_id' });


    // Event associations
    Event.hasMany(Fight, { foreignKey: 'event_id' });

}
    


  