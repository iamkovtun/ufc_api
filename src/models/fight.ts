import { DataTypes, Model, Sequelize, ForeignKey } from 'sequelize';
import { Event } from './event';
import { Fighter } from './fighter';

export class Fight extends Model {
    declare fight_id: number;
    declare event_id: ForeignKey<Event['event_id']>;
    declare fighter1_id: ForeignKey<Fighter['fighter_id']>;
    declare fighter2_id: ForeignKey<Fighter['fighter_id']>;
    declare weight_class: string;
    declare rounds: number;
    declare result: string;
    declare method: string;
    declare round_end: number;
    declare time_end: Date;
}

export function initFightModel(sequelize: Sequelize) {
    Fight.init(
        {
            fight_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            event_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Event,
                    key: 'event_id',
                },
            },
            fighter1_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Fighter,
                    key: 'fighter_id',
                },
            },
            fighter2_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Fighter,
                    key: 'fighter_id',
                },
            },
            weight_class: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            rounds: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            result: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            method: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            round_end: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            time_end: {
                type: DataTypes.TIME,
                allowNull: false,
            },
        },
        { sequelize, modelName: 'Fight'}
    );
}
