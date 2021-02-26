import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentUser', (req, res) => {
    if (!req.session?.jwt) {
        return res.send({ currentUser: null });
    }

    try {
        const payload = jwt.verify(
            req.session.jwt,
            
            // used ! to tell ts not to worry whether this is defined or not
            process.env.JWT_KEY! 
        );
        res.send({ currentUser: payload });
    } catch (err) {
        res.send({ currentUser: null});
    } 
});

export { router as currentUserRouter };

