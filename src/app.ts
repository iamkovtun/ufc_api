import { Sequelize } from 'sequelize';
import express from 'express';  

import { initFighterModel } from './models/fighter';
import fighterRouter from './routes/fighterRouter'; // Import the new router

import { initEventModel } from './models/event';
import eventRouter from './routes/eventRouter'; // Import the new router

import { initFightModel } from './models/fight';
import fightRouter from './routes/fightRouter'; // Import the new router

import { initJudgeModel } from './models/judge';
import judgeRouter from './routes/judgeRouter'; // Import the new router

import { initScorecardModel } from './models/scorecard';
import ScorecardRouter from './routes/scorecardRouter'; // Import the new router

import { initFighter_FightModel } from './models/fighter_fight';
import fighterFightRouter from './routes/fighterFightRouter'; // Import the new router

import { associateModels } from './associations';


let UPDATE_CONSTRAINS = false;

const app = express();
const port = process.env.PORT || 5000;

const sequelize = new Sequelize('newdb', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    schema: 'UFC'
});

app.use(express.json());


app.use('/fighters', fighterRouter); // Use the new router for fighters
initFighterModel(sequelize);

app.use('/events', eventRouter); // Use the new router for events
initEventModel(sequelize);

app.use('/fights', fightRouter); // Use the new router for events
initFightModel(sequelize);

app.use('/judges', judgeRouter); // Use the new router for judges
initJudgeModel(sequelize);

app.use('/scorecard', ScorecardRouter); // Use the new router for scorecard_id
initScorecardModel(sequelize);

app.use('/fighter_fights', fighterFightRouter); // Use the new router for fighter_fights
initFighter_FightModel(sequelize);


associateModels();


// temp function to update scorecard constraints

async function updateScorecardConstraints() {
    try {
        await sequelize.query('ALTER TABLE "UFC"."Scorecards" DROP CONSTRAINT IF EXISTS "Scorecards_fight_id_judge_id_key";');
        console.log('Old constraint dropped successfully.');

        await sequelize.query('ALTER TABLE "UFC"."Scorecards" ADD CONSTRAINT "Scorecards_fight_id_judge_id_key" UNIQUE ("fight_id", "judge_id", "fighter_id");');
        console.log('New constraint added successfully.');

        console.log('Scorecard constraints updated successfully.');
    } catch (error) {
        console.error('Error updating Scorecard constraints:', error);
    }
}


app.listen(port, async () => {
    await sequelize.sync();
    if (UPDATE_CONSTRAINS) {
        await updateScorecardConstraints();// temp function to update scorecard constraints
    }
    console.log(`Server is running on http://localhost:${port}`);
});
