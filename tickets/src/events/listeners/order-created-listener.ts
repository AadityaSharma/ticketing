import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCreatedEvent } from '@aadi-tickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    // subject: Subjects.OrderCreated = Subjects.OrderCreated;
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // Find the ticket that the orderis reserving
        const ticket = await Ticket.findById(data.ticket.id);

        // If no ticket, throw error
        if (!ticket) {
            throw new Error('Ticket not found!');
        }
        
        // mark the ticket as being reserved by setting its orderId property
        ticket.set({ orderId: data.id });

        // save the ticket
        await ticket.save();

        // ack the message
        msg.ack();
    }
}