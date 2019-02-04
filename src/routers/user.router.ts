import express from 'express';
import { UserDao } from '../dao/user.dao';
import { authMiddleware } from '../middleware/auth.middleware';


// we will assume all routes defined with this router
// start with '/users'
export const userRouter = express.Router();

// /users - find all
userRouter.get('', [
    authMiddleware,
    async (req, res) => {
      // res.json(users);
        try {
            const user = new(UserDao);
            const users = await user.findAll();
            res.render('users.ejs', {user: req.session.user, users: users});
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);