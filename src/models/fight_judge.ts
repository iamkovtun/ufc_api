import { DataTypes, Model, Sequelize, ForeignKey } from 'sequelize';
import { Fight } from './fight';
import { Judge } from './judge';
import { Fighter } from './fighter';

export class Fight_Judge extends Model {
    declare fight_id: ForeignKey<Fight['fight_id']>;
    declare judge_id: ForeignKey<Judge['judge_id']>;
    declare fighter_id: ForeignKey<Fighter['fighter_id']>;
    declare score: number;
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
            fighter_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Fighter,
                    key: 'fighter_id',
                },
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },{
            sequelize,
            modelName: 'Fight_Judge',
            indexes: [
                {
                  unique: true,
                  fields: ['fight_id', 'judge_id', 'fighter_id'],
                  name: 'Fight_Judges_fight_id_judge_id_fighter_id_key',
                },
            ]
          });

}
