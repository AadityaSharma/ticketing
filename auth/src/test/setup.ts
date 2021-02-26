import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;

// A hook function that will run before all tests
beforeAll(async () => {
    process.env.JWT_KEY = 'lalala';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// A hook function that will run before all tests
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

// A hook function that will run after all tests
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});