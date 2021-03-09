import { Subjects } from './subjects';

export interface ExpirationCompleteEvent {
    subject: Subjects.ExpirationComplete;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string
        };
    }
}