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

import { associateModels } from './associations';



const app = express();
const port = process.env.PORT || 5000;

const sequelize = new Sequelize('postgres', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
});

app.use(express.json());


app.use('/fighters', fighterRouter); // Use the new router for fighters
initFighterModel(sequelize);

app.use('/events', eventRouter); // Use the new router for events
initEventModel(sequelize);

app.use('/fight', fightRouter); // Use the new router for events
initFightModel(sequelize);

app.use('/judges', judgeRouter); // Use the new router for judges
initJudgeModel(sequelize);

initFight_JudgeModel(sequelize);

associateModels();

app.listen(port, async () => {
    await sequelize.sync();
    console.log(`Server is running on http://localhost:${port}`);
});
