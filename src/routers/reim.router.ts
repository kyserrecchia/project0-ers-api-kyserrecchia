import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { srcDir } from '../../app';
import { ReimDao } from '../dao/reim.dao';

export const reimRouter = express.Router();

// /users - find all
reimRouter.get('', [
    authMiddleware,
    async (req, res) => {
        try {
            res.sendFile(`${srcDir}/views/reim.html`);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);


reimRouter.get('/reimdata', [
    authMiddleware,
    async (req, res) => {
        try {
            const reim = new(ReimDao);
            const reims = await reim.findByStatus(1);
            res.json(reims);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);


///////////////////////////////////////////////////
// By status
reimRouter.get('/reimstatus/:statusId', [
    authMiddleware,
    async (req, res) => {
        try {
            const reim = new(ReimDao);
            const reims = await reim.findByStatus(+req.params.statusId);
            res.json(reims);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);

reimRouter.get('/status/:statusId', (req, res) => {
    res.sendFile(`${srcDir}/views/reimstatus.html`);
});


//////////////////////////////////////////////////////////
// By author

reimRouter.get('/author/byuserId/:userId', [
    authMiddleware,
    async (req, res) => {
        try {
            const reim = new(ReimDao);
            const reims = await reim.findByAuthor(+req.params.userId);
            res.json(reims);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);

reimRouter.get('/author/userId/:userId', (req, res) => {
    res.sendFile(`${srcDir}/views/reimAuthor.html`);
});


