"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const express_1 = __importDefault(require("express"));
const fighter_1 = require("./models/fighter");
const fighterRouter_1 = __importDefault(require("./routes/fighterRouter")); // Import the new router
const event_1 = require("./models/event");
const eventRouter_1 = __importDefault(require("./routes/eventRouter")); // Import the new router
const fight_1 = require("./models/fight");
const fightRouter_1 = __importDefault(require("./routes/fightRouter")); // Import the new router
const judge_1 = require("./models/judge");
const judgeRouter_1 = __importDefault(require("./routes/judgeRouter")); // Import the new router
const fight_judge_1 = require("./models/fight_judge");
const fightJudgeRouter_1 = __importDefault(require("./routes/fightJudgeRouter")); // Import the new router
const fighter_fight_1 = require("./models/fighter_fight");
const fighterFightRouter_1 = __importDefault(require("./routes/fighterFightRouter")); // Import the new router
const associations_1 = require("./associations");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const sequelize = new sequelize_1.Sequelize('postgres', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    schema: 'UFC'
});
app.use(express_1.default.json());
app.use('/fighters', fighterRouter_1.default); // Use the new router for fighters
(0, fighter_1.initFighterModel)(sequelize);
app.use('/events', eventRouter_1.default); // Use the new router for events
(0, event_1.initEventModel)(sequelize);
app.use('/fights', fightRouter_1.default); // Use the new router for events
(0, fight_1.initFightModel)(sequelize);
app.use('/judges', judgeRouter_1.default); // Use the new router for judges
(0, judge_1.initJudgeModel)(sequelize);
app.use('/fight_judges', fightJudgeRouter_1.default); // Use the new router for fight_judges
(0, fight_judge_1.initFight_JudgeModel)(sequelize);
app.use('/fighter_fights', fighterFightRouter_1.default); // Use the new router for fighter_fights
(0, fighter_fight_1.initFighter_FightModel)(sequelize);
(0, associations_1.associateModels)();
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.sync();
    console.log(`Server is running on http://localhost:${port}`);
}));
