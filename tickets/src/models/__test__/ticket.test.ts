import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
    // create an instance of a ticket
    const ticket = Ticket.build({
        title: 'Our victory concert',
        price: 50,
        userId: '123'
    });

    // save the ticket to the database
    await ticket.save();

    // fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // make two separate changes to the tickets we fetched
    firstInstance!.set({ price: 10 });
    firstInstance!.set({ price: 15 });

    // save the first fetched ticket
    await firstInstance!.save();

    // save the second fetched ticket and expect an error

    // commented this out, because currently this assertion doesn't work as expected
    // expect(async () => {
    //     await secondInstance!.save();
    // }).toThrow();

    // so, try this approach instead
    try {
        await secondInstance!.save();
    } catch (err) {
        // read more about done() callback and jest
        // done() is function that we should invoke manually if we
        // want to specifically tell jest that we're done with our test and 
        // we should not further expect anything else to go on with our test
        return done();
    }

    throw new Error('Should not reach this point');
});