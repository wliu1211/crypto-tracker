import axios from 'axios';
const {v4: uuidv4,} = require('uuid')


const URL_COINS_BASE = 'https://api.coingecko.com/api/v3/coins';
const URL_COINS_MARKETS = `${URL_COINS_BASE}/market`;

const LOCAL_URL = 'http://localhost:5000';
const LOCAL_URL_WATCHLIST = `${LOCAL_URL}/api/v1/watchlists`;

export class CryptoService {
    constructor(){
        this.cryptoList = [];
    }
    setCryptoList = (cryptoList) => {this.cryptoList = cryptoList}
    async getSupportedCoins(cb) {
        try {
            const response1Hr = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h');
            const response24Hr = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h');
            const response7D = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=7d');
            await Promise.all([response1Hr, response24Hr, response7D]).then(values => {
                const [data1Hr, data24Hr, data7D, ] = values;
                if (data1Hr.status === 200 && data24Hr.status === 200 && data7D.status === 200) {    
                    const findIndex = (cryptoId) => {
                        const index = data7D.data.findIndex(crypto => crypto.id === cryptoId)
                        return index;
                    }
                    const cryptoData = data1Hr.data.map(crypto => ({
                        id: crypto.id,
                        img: crypto.image,
                        name: crypto.name,
                        ticker: crypto.symbol.toUpperCase(),
                        price: crypto.current_price >= 1 ? crypto.current_price.toFixed(2) : crypto.current_price.toPrecision(2),
                        hour: Math.round(crypto.price_change_percentage_1h_in_currency * 10) / 10,
                        day: Math.round(crypto.price_change_percentage_24h * 10) / 10,
                        week: Math.round(data7D.data[findIndex(crypto.id)].price_change_percentage_7d_in_currency * 10) / 10,
                        dailyVolume: crypto.total_volume,
                        max_supply: crypto.total_supply || crypto.circulating_supply,
                        circ_supply: Math.floor(crypto.circulating_supply),
                        marketCap: crypto.market_cap,
                        rank: crypto.market_cap_rank,
                        ath: crypto.ath,
                        ath_change_percent: crypto.ath_change_percentage.toFixed(2),
                        ath_date: new Date(crypto.ath_date),
                        atl: crypto.atl,
                        atl_change_percent: crypto.atl_change_percentage.toFixed(2),
                        atl_date: new Date(crypto.atl_date),
                        dayHigh: crypto.high_24h >= 1 ? crypto.high_24h.toFixed(2) : crypto.high_24h.toPrecision(2),
                        dayLow: crypto.low_24h >= 1 ? crypto.low_24h.toFixed(2) : crypto.low_24h.toPrecision(2),
                        day_price_change: Math.abs(crypto.price_change_24h) >= 1 ? crypto.price_change_24h.toFixed(2) : crypto.price_change_24h.toPrecision(2),
                        full_market_cap: crypto.fully_diluted_valuation || crypto.market_cap,
                        market_cap_change_percent: crypto.market_cap_change_percentage_24h.toFixed(2),
                    }))
                    this.setCryptoList(cryptoData);
                    cb(cryptoData);
                    console.log(cryptoData);
                }
            })
        } catch (error) {
            console.error("Error in getting all supported coins", error);
            throw error;
        }
    }
    
    async getCoinDataRange(cryptoName, daysInterval){
        try {
            const response = await axios.get(`${URL_COINS_BASE}/${cryptoName}/market_chart?vs_currency=usd&days=${daysInterval}`);
            if (response.status === 200) { 
                return response.data;
            }
            
        } catch (error) {
            console.error("Error in getting crypto data range", error);
            throw error;
        }
    }

    async getCoinOhlcData(coinId, days) {
        try {
            const response = await axios.get(`${URL_COINS_BASE}/${coinId}/ohlc?vs_currency=usd&days=${days}`);
            if (response.status === 200) { 
                return response.data;
            }
        } catch (error) {
            console.error("Error in getting crypto OHLC data", error);
            throw error;
        }
    }
}

export class WatchlistService {
    constructor() {
        this.watchlistArray = [];
    }

    addToWatchlist = (listName) => {
        const watchlistObject = {
            id: uuidv4(),
            name: listName,
            cryptoList: []
        }
        this.watchlistArray.push(watchlistObject)
    };

    getAllLists = async () => {
        try {
            const response = await axios.get(LOCAL_URL_WATCHLIST);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            throw error;
        }
    }

    addWatchlist = async (listName) => {
        const watchlistObject = {
            name: listName,
            cryptoList: []
        }
        try {
            await axios.post(LOCAL_URL_WATCHLIST, watchlistObject);
        } catch (error) {
            console.error(`Error: ${error}`);
            throw error;
        }
    }

    editWatchlist = async (newListName, list) => {
        const updatedData = {
            "name": newListName,
            "cryptoList": [...list.cryptoList]
        }
        try {
            const response = await axios.put(`${LOCAL_URL_WATCHLIST}/${list._id}`, updatedData)
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error(`Error ${error}`);
            throw error;
        }
    }

    deleteWatchlist = async (watchlistId) => {
        try {
            await axios.delete(`${LOCAL_URL_WATCHLIST}/${watchlistId}`);
        } catch (error) {
            console.error(`Error: ${error}`);
            throw error;    
        }
    }

    addCoinToList = async (list, coinInfo) => {
        try {
            const response = await axios.put(`${LOCAL_URL_WATCHLIST}/${list._id}`, coinInfo)
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error(`Error ${error}`);
            throw error;
        }
    }
    
    deleteCoinFromList = async (crypto, list) => {
        const cryptoInfo = {
            "cryptoId": crypto._id
        }
       try {
           await axios.put(`${LOCAL_URL_WATCHLIST}/${list._id}`, cryptoInfo)
       } catch (error) {
            console.error(`Error ${error}`);
            throw error;
       }
        
    }

}
