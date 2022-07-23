const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const environment = require('./environment');
const mangasRoutes = require('./routes/mangasController');
const mangasListsRoutes = require('./routes/mangasListsController');
const botsRoutes = require('./routes/botsController');
const usersRoutes = require('./routes/usersController');

require('./models/dbConfig');

const app = express();

app.use(bodyParser.json());
app.use(cors(environment.corsOptions));
app.use('/mangas', mangasRoutes);
app.use('/mangas/lists', mangasListsRoutes);
app.use('/bots', botsRoutes);
app.use('/users', usersRoutes);


app.listen(environment.port, () => console.log("API started on port : " + environment.port));