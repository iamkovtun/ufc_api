import { DataTypes, Model, Sequelize, ForeignKey } from 'sequelize';
import { Fight } from './fight';
import { Judge } from './judge';
import { Fighter } from './fighter';

export class Scorecard extends Model {
    declare scorecard_id: number;
    declare fight_id: ForeignKey<Fight['fight_id']>;
    declare judge_id: ForeignKey<Judge['judge_id']>;
    declare fighter_id: ForeignKey<Fighter['fighter_id']>;
    declare score: number;
}

export function initScorecardModel(sequelize: Sequelize) {
    Scorecard.init(
        {
            scorecard_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            fight_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Fight,
                    key: 'fight_id',
                },
            },
            judge_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Judge,
                    key: 'judge_id',
                },
            },
            fighter_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Fighter,
                    key: 'fighter_id',
                },
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Scorecard',
        }
    );
}
