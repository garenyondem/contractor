import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { Op } from 'sequelize';

export const routes = Router();

routes.post('/best-profession', async function (req: any, res: Response, next: NextFunction): Promise<any> {
    const { Job, Profile, Contract } = req.app.get('models');
    const { start, end } = req.query;
    const profile = req.profile;

    const paidJobs = await Job.findAll({ where: { paid: true } });

    const closedContracts = await Contract.findAll({
        where: {
            id: {
                [Op.in]: paidJobs.map((x: { ContractId: any }) => x.ContractId),
            },
        },
    });
    // TODO:

    res.json(true);
});
