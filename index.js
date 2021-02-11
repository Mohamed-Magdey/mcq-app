require('dotenv').config();
const express                            = require('express'),
      app                                = express(),
      cors                               = require('cors'),
      helmet                             = require('helmet'),
      errorHandler                       = require('./controllers/error');
      questionRoutes                      = require('./routes/questions');

const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', questionRoutes);

app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});

