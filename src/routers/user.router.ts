import express from 'express';
import { UserDao } from '../dao/user.dao';
import { authMiddleware } from '../middleware/auth.middleware';
import { srcDir } from '../../app';

// we will assume all routes defined with this router
// start with '/users'
export const userRouter = express.Router();

// /users - find all
userRouter.get('', [
    authMiddleware,
    async (req, res) => {
        try {
            res.sendFile(`${srcDir}/views/users.html`);
            // res.render('users.ejs', {sessUser: req.session.user, users: users});
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);


userRouter.get('/userdata', [
    authMiddleware,
    async (req, res) => {
        try {
            const user = new(UserDao);
            const users = await user.findAll();
            res.json(users);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);

userRouter.get('/userdatawithrole', [
    authMiddleware,
    async (req, res) => {
        try {
            const user = new(UserDao);
            const users = await user.findAllWithRole();
            res.json(users);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);

//////////////////////////////////////////////////
userRouter.get('/userdatabyid/:id', async (req, res) => {
        try {
            const user = new(UserDao);
            const users = await user.findById(+req.params.id);
            res.json(users);
        } catch (err) {
            res.sendStatus(500);
        }
});

userRouter.get('/:userId', (req, res) => {
    res.sendFile(`${srcDir}/views/userid.html`);
});