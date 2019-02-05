import express from 'express';
import { UserDao } from '../dao/user.dao';
import { srcDir } from '../../app';

export const authRouter = express.Router();

// check if logged in
authRouter.get('/', (req, res, next) => {
    if (req.session.user === undefined) {
        res.redirect('/login');
    } else {
        next();
    }
});

// if not logged in, sent here
authRouter.get('/login', (req, res) => {
    res.sendFile(`${srcDir}/views/login.html`);
});


// post for log in, then redirected to home page
authRouter.post('/login', async (req, res) => {

    let users = [];
    try {
        const user = new(UserDao);
        users = await user.findAll();
    } catch (err) {
        res.send(err);
    }

    let isUser = false;
    // let userRole = 0;
    users.forEach(user => {
        // check if valid user
        if (user.username === req.body.username) {
            // userRole = user.role;
            isUser = true;
            req.session.user = user;
        }
    });
    if (!isUser) {
        res.sendStatus(401);
    // } else if (userRole === 1) {
    //     const user = {
    //         username: req.body.username,
    //         role: 'admin'
    //     };
    //     res.redirect('/');
    // } else if (userRole === 2) {
    //     const user = {
    //         username: req.body.username,
    //         role: 'financial manager'
    //     };
    //     req.session.user = user;
    //     res.redirect('/');
    // } else if (userRole === 3) {
    //     const user = {
    //         username: req.body.username,
    //         role: 'associate'
    //     };
    //     req.session.user = user;
    //     res.redirect('/');
    } else {
        res.redirect('/');
    }
});


// get request for home page after logged in
authRouter.get('/', (req, res) => {
    console.log(req.session.user);
    res.sendFile(`${srcDir}/views/home.html`);
});


// send user session data
authRouter.get('/info', (req, res) => {
    res.json(req.session.user);
});
