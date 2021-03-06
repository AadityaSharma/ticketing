import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@aadi-tickets/common';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';

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
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUser);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

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

export { app };