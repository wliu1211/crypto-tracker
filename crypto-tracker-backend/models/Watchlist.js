const mongoose = require('mongoose');

const CryptoListSchema = new mongoose.Schema({
    id: String,
    img: String,
    name: String,
    ticker: {
        type: String,
        uppercase: true,
    },
    price: Number,
    hour: Number,
    day: Number,
    week: Number,
    dailyVolume: Number,
    max_supply: Number,
    circ_supply:Number,
    marketCap: Number,
    rank: Number,
    ath: Number,
    ath_change_percent: Number,
    ath_date: Date,
    atl: Number,
    atl_change_percent: Number,
    atl_date: Date,
    dayHigh: Number,
    dayLow: Number,
    day_price_change: Number,
    full_market_cap: Number,
    market_cap_change_percent: Number,
})


const WatchlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    cryptoList: [CryptoListSchema]
})

module.exports = mongoose.model('Watchlist', WatchlistSchema);