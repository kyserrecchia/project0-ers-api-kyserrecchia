import express from 'express';

export const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.username === 'kyle' && req.body.password === 'password') {
    const user = {
      username: req.body.username,
      role: 'admin'
    };
    req.session.user = user;
    res.json(user);
  } else if (req.body.username !== null) {
    const user = {
      username: req.body.username,
      role: 'associate'
    };
    req.session.user = user;
    res.json(user);
  } else {
    res.sendStatus(401);
  }
});


authRouter.get('/info', (req, res) => {
  res.json(req.session.user);
});