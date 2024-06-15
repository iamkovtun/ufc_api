import { DataTypes, Model, Sequelize } from 'sequelize';

export class Fighter extends Model {
    declare fighter_id: number;
    declare first_name: string;
    declare last_name: string;
    declare nickname: string;
    declare birthdate: Date;
    declare nationality: string;
    declare height: number;
    declare weight: number;
    declare reach: number;
    declare stance: string;
    declare record_wins: number;
    declare record_losses: number;
    declare record_draws: number;
    declare record_no_contests: number;
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
            weight: {
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
            record_wins: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            record_losses: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            record_draws: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            record_no_contests: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        { sequelize, modelName: 'Fighter'}
    );
}
