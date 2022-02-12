const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors')

// Route files
const watchlists = require('./routes/watchlist');
// const cryptoList = require('./routes/cryptoList');

dotenv.config({ path: './config/config.env' });


connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/watchlists', watchlists);
// app.use('/api/v1/watchlists/:listId/cryptoList', cryptoList);

const server = app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
)

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1));
})