import { Publisher, OrderCreatedEvent, Subjects } from '@aadi-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    // subject: Subjects.OrderCreated = Subjects.OrderCreated;
    readonly subject = Subjects.OrderCreated;
}