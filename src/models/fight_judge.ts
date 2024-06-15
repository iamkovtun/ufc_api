import { DataTypes, Model, Sequelize, ForeignKey } from 'sequelize';
import { Fight } from './fight';
import { Judge } from './judge';

export class Fight_Judge extends Model {
    declare fight_id: ForeignKey<Fight['fight_id']>;
    declare judge_id: ForeignKey<Judge['judge_id']>;
    declare score_fighter1: number;
    declare score_fighter2: number;
}

export function initFight_JudgeModel(sequelize: Sequelize) {
    Fight_Judge.init(
        {
            fight_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Fight,
                    key: 'fight_id',
                },
            },
            judge_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Judge,
                    key: 'judge_id',
                },
            },
            score_fighter1: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            score_fighter2: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },{
            sequelize,
            modelName: 'Fight_Judge',
          });

}
