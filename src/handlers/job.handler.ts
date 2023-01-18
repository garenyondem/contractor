import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { Op } from 'sequelize';

export const routes = Router();

routes.get('/unpaid', async function (req: any, res: Response, next: NextFunction): Promise<any> {
    const { Job } = req.app.get('models');

    const unpaidJobs = await Job.findAll({
        where: {
            paymentDate: {
                [Op.is]: null,
            },
        },
    });
    if (!unpaidJobs) return res.status(404).end();
    res.json(unpaidJobs);
});

routes.post('/:jobId/pay', async function (req: any, res: Response, next: NextFunction): Promise<any> {
    const { Job, Profile, Contract } = req.app.get('models');
    const { jobId } = req.params;
    const profile = req.profile;

    let job = await Job.findOne({
        where: {
            id: jobId,
            paymentDate: {
                [Op.is]: null,
            },
        },
    });
    if (!job) return res.status(404).end();

    if (profile.balance < job.price) {
        return res.status(404).end();
    }
    // Job is closed
    await Job.update(
        {
            paid: true,
            paymentDate: new Date().toISOString(),
        },
        {
            where: {
                id: jobId,
            },
        }
    );
    // Detuct job amount from client
    await Profile.decrement({ balance: -job.price }, { where: { id: profile.id } });
    // Add job payment to contractor
    const contract = await Contract.findOne({
        where: {
            id: job.ContractId,
        },
    });
    await Profile.increment({ balance: job.price }, { where: { id: contract.ContractorId } });
    // Return updated job record
    job = await Job.findOne({
        where: {
            id: jobId,
        },
    });
    res.json(job);
});
