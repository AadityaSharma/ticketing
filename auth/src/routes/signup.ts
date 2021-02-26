import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 to 10 characters long')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password });
        
        // now, save the user to the database with save() async method
        await user.save();

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email
            }, 
            // skip ts check with !
            // as we already know that JWT_KEY is defined
            // If not defined, an error will be thrown in the index.ts start() method
            process.env.JWT_KEY!
        );

        // Store JWT on session object
        req.session = {
            jwt: userJwt
        }

        res.status(201).send(user);
    }
);

export { router as signupRouter };

