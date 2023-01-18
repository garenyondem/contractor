import { ENUM, Model, Sequelize, TEXT } from 'sequelize';

export default class Contract extends Model {
    static load(sequelize: Sequelize) {
        Contract.init({
            terms: {
                type: TEXT,
                allowNull: false
            },
            status: {
                type: ENUM('new', 'in_progress', 'terminated')
            }
        },
            {
                sequelize,
                modelName: 'Contract'
            }
        )
    }
}
