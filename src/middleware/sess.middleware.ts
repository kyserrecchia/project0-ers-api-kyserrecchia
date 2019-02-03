

export function sessMiddleware(req, res, next) {
    const user = req.session.user;
    if ((user && user.role === 'admin') || (user && user.role === 'fin man')) {
      next();
    } else {
      res.sendStatus(401);
    }
}