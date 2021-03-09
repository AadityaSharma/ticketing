import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCancelledEvent, OrderStatus } from '@aadi-tickets/common';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    // subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        // Find the order that is cancelled
        const order = await Order.findOne({
            _id: data.id,
            version: data.version - 1
        });

        // If no order, throw error
        if (!order) {
            throw new Error('Order not found!');
        }
        
        // mark the order as cancelled
        order.set({ status: OrderStatus.Cancelled });

        // save the order
        await order.save();

        // ack the message
        msg.ack();
    }
}