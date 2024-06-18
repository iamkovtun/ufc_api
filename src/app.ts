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

import { initFight_JudgeModel } from './models/fight_judge';
import fightJudgeRouter from './routes/fightJudgeRouter'; // Import the new router

import { initFighter_FightModel } from './models/fighter_fight';
import fighterFightRouter from './routes/fighterFightRouter'; // Import the new router

import { associateModels } from './associations';



const app = express();
const port = process.env.PORT || 5000;

const sequelize = new Sequelize('postgres', 'postgres', '1111', {
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

app.use('/fight_judges', fightJudgeRouter); // Use the new router for fight_judges
initFight_JudgeModel(sequelize);

app.use('/fighter_fights', fighterFightRouter); // Use the new router for fighter_fights
initFighter_FightModel(sequelize);


associateModels();





app.listen(port, async () => {
    await sequelize.sync();
    console.log(`Server is running on http://localhost:${port}`);
});
