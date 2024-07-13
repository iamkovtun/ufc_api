import { DataTypes, Model, Sequelize } from 'sequelize';

export class Fighter extends Model {
    declare fighter_id: number;
    declare first_name: string;
    declare last_name: string;
    declare nickname: string;
    declare birthdate: Date;
    declare nationality: string;
    declare height: number;
    declare reach: number;
    declare stance: string;
}

export function initFighterModel(sequelize: Sequelize) {
    Fighter.init(
        {
            fighter_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            birthdate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            nationality: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            height: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: true,
            },
            reach: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: true,
            },
            stance: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
        },
        { sequelize, modelName: 'Fighter'}
    );
}
