const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-Parser');

// Settings
app.set('port', process.env.PORT || 3000 );

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
require('./routes/userRoutes')(app);

// Static files 
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});