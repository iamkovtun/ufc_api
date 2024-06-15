import { DataTypes, Model, Sequelize } from 'sequelize';

export class Event extends Model {
    declare event_id: number;
    declare event_name: string;
    declare date: Date;
    declare location: string;
    declare venue: string;
    declare attendance: number;
}

export function initEventModel(sequelize: Sequelize) {
    Event.init(
        {
            event_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            event_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            venue: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            attendance: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, modelName: 'Event'}
    );
}
