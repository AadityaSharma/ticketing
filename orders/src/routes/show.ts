import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/orders/:orderid',
    // requireAuth,
    async (req: Request, res: Response) => {

        res.send({});
    }
);

export { router as showOrderRouter };