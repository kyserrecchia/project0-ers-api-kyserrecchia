import express from 'express';

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
    res.render(`login.ejs`);
});

// post for log in, then redirected to home page
authRouter.post('/login', (req, res) => {
    if (req.body.username === 'kyle' && req.body.password === 'password') {
        const user = {
        username: req.body.username,
        role: 'admin'
        };
        req.session.user = user;
        res.redirect('/');
    } else if (req.body.username !== null) {
        const user = {
        username: req.body.username,
        role: 'associate'
        };
        req.session.user = user;
        res.redirect('/');
    } else {
        res.sendStatus(401);
    }
});

// get request for home page after logged in
authRouter.get('/', (req, res) => {
    console.log(req.session.user);
    res.render(`home.ejs`);
});
