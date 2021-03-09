import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError,
    NotFoundError,
    NotAuthorizedError,
    OrderStatus
} from '@aadi-tickets/common';
import { stripe } from '../stripe';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/payments',
requireAuth,
[
    body('token')
        .not()
        .isEmpty()
        .withMessage('Invalid request'),
    body('orderId')
        .not()
        .isEmpty()
        .withMessage('orderId is required')
],
validateRequest,
async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
        throw new BadRequestError('Cannot pay for a cancelled order');
    }

    await stripe.charges.create({
        currency: 'inr',
        amount: order.price * 100,
        source: token,
        description: 'My First Test Charge (created for API docs)',
    });

    res.send({ success: true });
});

export { router as createChargeRouter };