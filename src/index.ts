import express from 'express';
// import { userRouter } from './routers/user.router';
// import { pokemonRouter } from './routers/pokemon.router';
import session from 'express-session';
// import { authRouter } from './routers/auth.router';
import bodyParser from 'body-parser';

const app = express();

// set up body parser to convert json body to js object and attach to req
app.use(bodyParser.json());

// create logging middleware
app.use((req, res, next) => {
  console.log(`request was made with url: ${req.path}
  and method: ${req.method}`);
  next(); // will pass the request on to search for the next piece of middleware
});

// set up express to attach sessions
const sess = {
  secret: 'potato',
  cookie: { secure: false },
  resave: false,
  saveUnitialized: false
};
// prior to this req.sesssion is nothing
// after this req.session is an object we can store
// any user data we want on
app.use(session(sess));

// allow cross origins
app.use((req, resp, next) => {
  (process.env.MOVIE_API_STAGE === 'prod')
    ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
    : resp.header('Access-Control-Allow-Origin', `http://localhost:5500`);
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// app.use('/auth', authRouter);
// app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile((__dirname + '/views/login.html'));
});

app.get('/index', (req, res) => {
    res.sendFile((__dirname + '/views/index.html'));
});


app.get('/users', (req, res) => {
  res.send('here are your users');
});

// app.post('/users', (req, res) => {
//   const user = req.body;
//   console.log(user)
//   res.sendStatus(201);
// })

// app.get('/pokemon', (req, res) => {
//   res.send('here are your pokemon');
// })

app.get('/pokemon-moves', (req, res) => {
  res.send('here are all the available pokemon moves');
});

app.listen(3000);
console.log('application started on port: 3000');