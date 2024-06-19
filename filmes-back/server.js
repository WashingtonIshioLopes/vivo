const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const createLogger = require('./logs/winston');

const usuarioRouter = require('./routes/usuarioRoute');
const filmeRoutes = require('./routes/filmeRoute');
const tmdbRoutes = require('./routes/tmdbRoute');

const logger = createLogger();

app.use(cors());

//ou

/*
const allowedOrigins = ['http://localhost:4200'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
*/


// Middleware para registrar solicitações HTTP
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send('Something failed.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/usuarios', usuarioRouter);
app.use('/api/filmes', tmdbRoutes);
app.use('/api/meusfilmes/', filmeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
