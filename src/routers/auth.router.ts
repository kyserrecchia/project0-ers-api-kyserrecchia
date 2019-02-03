import express from 'express';
import { Role } from '../models/role';

export const authRouter = express.Router();

// for getting relative paths
const dirString = __dirname;
const srcDir = dirString.substring(0, dirString.length - 7);

authRouter.get('/', (req, res, next) => {
    if (req.session.user === undefined) {
        res.redirect('/login');
    } else {
        next();
    }
});

authRouter.get('/', (req, res) => {
    res.sendFile(`${srcDir}/views/home.html`);
});

authRouter.get('/login', (req, res) => {
    res.sendFile(`${srcDir}/views/login.html`);
});

authRouter.post('/login', (req, res) => {
    console.log(req.body);
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


authRouter.get('/info', (req, res) => {
  res.json(req.session.user);
});