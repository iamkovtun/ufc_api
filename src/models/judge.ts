import { DataTypes, Model, Sequelize } from 'sequelize';

export class Judge extends Model {
    declare judge_id: number;
    declare first_name: string;
    declare last_name: string;
    declare nationality: string;
}

export function initJudgeModel(sequelize: Sequelize) {
    Judge.init(
        {
            judge_id: {
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
            nationality: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },{
            sequelize,
            modelName: 'Judge',
          });
}
