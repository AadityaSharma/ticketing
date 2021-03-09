import {
    Subjects,
    Publisher,
    ExpirationCompleteEvent,
  } from '@aadi-tickets/common';
  
  export class ExpirationCompletePublisher extends Publisher<
    ExpirationCompleteEvent
  > {
    // subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    readonly subject = Subjects.ExpirationComplete;
  }
  