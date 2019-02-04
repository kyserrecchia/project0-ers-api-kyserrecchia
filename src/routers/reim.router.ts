import express from 'express';
import { UserDao } from '../dao/user.dao';

export const reimRouter = express.Router();

reimRouter.get('/', (req, res) => {
    res.render('reim.ejs', {user: req.session.user});
});

reimRouter.get('/submit', (req, res) => {
    res.render('submit.ejs', {user: req.session.user});
});