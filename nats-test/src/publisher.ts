import nats from 'node-nats-streaming';

console.clear();

// stan is nats backwards
// stan is actually an instance (or a client) that we're
// using to connect to the nats streaming server
// we could have called this variable "client" as well, but 
// calling it "stan" because everyone else in the community does it.. hehe!! 
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS!');

    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20
    });

    stan.publish('ticket:created', data, () => {
        console.log('Event published!');
    });
});