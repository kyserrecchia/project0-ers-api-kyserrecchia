

// for getting relative paths
const dirString = __dirname;
const srcDir = dirString.substring(0, dirString.length - 10);

// checks session and redirects user as needed
export function sessMiddleware(req, res, next) {
    const user = req.session.user;
    // if user already signed in with a session, go to particular pages from homepage
    if (user && user.role === 'admin') {
        res.sendFile(`${srcDir}/views/admin.html`);
    } else if (user && user.role === 'associate') {
        res.sendFile(`${srcDir}/views/user.html`);
    // otherwise, send user to log in
    } else {
        res.redirect('/login');
    }
}
