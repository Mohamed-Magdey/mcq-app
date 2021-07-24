require('dotenv').config();
const path                               = require('path'),
      express                            = require('express'),
      app                                = express(),
      cors                               = require('cors'),
      helmet                             = require('helmet'),
      errorHandler                       = require('./controllers/error');
      questionRoutes                      = require('./routes/questions');

const PORT = process.env.PORT || 8080;

app.use(
    helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", 'https://mcq-mern-app.herokuapp.com/api'],
          frameSrc: ["'self'", 'https://mcq-mern-app.herokuapp.com/api'],
          childSrc: ["'self'", 'https://mcq-mern-app.herokuapp.com/api'],
          scriptSrc: ["'self'", 'https://mcq-mern-app.herokuapp.com/api'],
          styleSrc: [
            "'self'",
            'https://fonts.googleapis.com'
            ],
          fontSrc: ["'self'", ' data: https://fonts.gstatic.com'],
          baseUri: ["'self'"],
        },
      })
);
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'view/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
});

app.use('/api', questionRoutes);

app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});

