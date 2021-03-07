import { Publisher, OrderCancelledEvent, Subjects } from '@aadi-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    // subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    readonly subject = Subjects.OrderCancelled;
}