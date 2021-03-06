import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@aadi-tickets/common';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/orders',
    requireAuth,
    [
        body('ticketId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('TicketId is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        res.send({});
    }
);

export { router as newOrderRouter };