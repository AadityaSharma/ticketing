import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

// This is to make express aware that
// our requests are coming from nginx proxy
// and to make sure that it should trust that traffic
// even though its coming from a proxy
app.set('trust proxy', true);

app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


// This is useful for async scenarios
// app.all('*', async (req, res, next) => {
//     next(new NotFoundError());
// });

// This code will not handle async scenarios
// app.all('*', () => {
//     throw new NotFoundError();
// });

// Better we're using 'express-async-errors' package
app.all('*', async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!');
    });
};

start();

