import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { Op } from 'sequelize';

export const routes = Router();

routes.get('/:contractId', async function (req: any, res: Response, next: NextFunction): Promise<any> {
    const { Contract } = req.app.get('models');
    const { contractId } = req.params;
    const profile = req.profile;

    const contract = await Contract.findOne({
        where: {
            [Op.and]: [{ id: contractId }, { [Op.or]: [{ ContractorId: profile.id }, { ClientId: profile.id }] }],
        },
    });
    if (!contract) return res.status(404).end();
    res.json(contract);
});

routes.get('/', async function (req: any, res: Response, next: NextFunction): Promise<any> {
    const { Contract } = req.app.get('models');
    const profile = req.profile;

    const contracts = await Contract.findAll({
        where: {
            [Op.or]: [{ ContractorId: profile.id }, { ClientId: profile.id }],
        },
    });
    if (!contracts) return res.status(404).end();
    res.json(contracts);
});
 