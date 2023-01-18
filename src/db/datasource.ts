import { Dialect, Sequelize } from 'sequelize';
import { contractModel, profileModel, jobModel } from '../models';

export class Datasource {
    sequelize: Sequelize;
    

    constructor(dialect: Dialect, storagePath: string) {
        this.sequelize = new Sequelize({
            dialect: dialect,
            storage: storagePath,
        });
        this.loadModels();
        this.createRelations();
    }

    private loadModels() {
        contractModel.load(this.sequelize);
        jobModel.load(this.sequelize);
        profileModel.load(this.sequelize);
    }

    private createRelations() {
        profileModel.hasMany(contractModel, { as: 'Contractor', foreignKey: 'ContractorId' });
        profileModel.hasMany(contractModel, { as: 'Client', foreignKey: 'ClientId' });
        contractModel.belongsTo(profileModel, { as: 'Contractor' });
        contractModel.belongsTo(profileModel, { as: 'Client' });
        contractModel.hasMany(jobModel);
        jobModel.belongsTo(contractModel);
    }
}
