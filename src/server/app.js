var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var app = express();

// port no
const port = 3000;
const mongodPort = 27017;

const route = require('./routes/route');

// connect to mongodb
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// mongoose.connect(`mongodb://localhost:${mongodPort}/post-app`, connectOptions);
mongoose.connect(`mongodb://localhost:${mongodPort}/super`, connectOptions);

// on connction
mongoose.connection.on('connected', () => {
    console.log(`Connected to database mongodb @ ${mongodPort}`);
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.error(`Error in database connection:`, err);
    }
});

// adding middleware - cores
app.use(cors());

// body - parser
app.use(bodyparser.json());

// static files
app.use(express.static(path.join(__dirname, 'src')));

// routes
app.use('/api', route);

// testing
app.get('/', (req, res) => {
    res.send('foobar');
});

app.listen(port, () => {
    console.log('Server started at port:', port);
});
