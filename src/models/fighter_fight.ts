import { DataTypes, Model, Sequelize, ForeignKey } from 'sequelize';
import { Fight } from './fight';
import { Fighter } from './fighter';

export class Fighter_Fight extends Model {
    declare fight_id: ForeignKey<Fight['fight_id']>;
    declare fighter_id: ForeignKey<Fighter['fighter_id']>;
}

export function initFighter_FightModel(sequelize: Sequelize) {
    Fighter_Fight.init(
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
            fighter_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Fighter,
                    key: 'fighter_id',
                },
            },
        },{
            sequelize,
            modelName: 'Fighter_Fight',
          });

}
