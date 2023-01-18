import { BOOLEAN, DATE, DECIMAL, Model, Sequelize, TEXT } from 'sequelize';

export default class Job extends Model {
    static load(sequelize: Sequelize) {
        Job.init(
            {
                description: {
                    type: TEXT,
                    allowNull: false,
                },
                price: {
                    type: DECIMAL(12, 2),
                    allowNull: false,
                },
                paid: {
                    type: BOOLEAN,
                    defaultValue: false,
                },
                paymentDate: {
                    type: DATE,
                },
            },
            {
                sequelize,
                modelName: 'Job',
            }
        );
    }
}
