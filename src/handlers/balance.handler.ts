import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { Op } from 'sequelize';

export const routes = Router();

routes.post('/deposit/:clientId', async function (req: any, res: Response, next: NextFunction): Promise<any> {
    const { Job, Profile, Contract } = req.app.get('models');
    const { clientId } = req.params;
    const profile = req.profile;
    const { amount } = req.body;
    // Get clients open contracts
    const clientOpenContracts = await Contract.findAll({
        where: {
            ClientId: profile.id,
            status: {
                [Op.ne]: 'terminated',
            },
        },
    });
    if (!clientOpenContracts.length) return res.status(404).end();
    const clientReservedSum = await Job.sum('price', { where: { ContractId: { [Op.in]: clientOpenContracts.map((x: { id: any }) => x.id) } } });
    if (amount > clientReservedSum * 0.25) {
        // can't deposit more than 25%
        return res.status(404).end();
    }
    await Profile.increment({ balance: amount }, { where: { id: clientId } });

    res.json(true);
});
