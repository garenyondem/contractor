import { DECIMAL, ENUM, Model, Sequelize, STRING } from "sequelize";

export default class Profile extends Model {
    static load(sequelize: Sequelize) {
        Profile.init(
            {
                firstName: {
                    type: STRING,
                    allowNull: false
                },
                lastName: {
                    type: STRING,
                    allowNull: false
                },
                profession: {
                    type: STRING,
                    allowNull: false
                },
                balance: {
                    type: DECIMAL(12, 2)
                },
                type: {
                    type: ENUM('client', 'contractor')
                }
            },
            {
                sequelize,
                modelName: 'Profile'
            }
        );
    }
}