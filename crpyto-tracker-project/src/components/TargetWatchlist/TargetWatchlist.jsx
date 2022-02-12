import React, {useContext, useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { ChartContext, WatchlistContext } from '../../App';
import './TargetWatchlist.css'
import MarketMiniChart from '../MarketMiniChart/MarketMiniChart';
import { formatNumber } from '../../miscFunctions';


function TargetWatchlist() {
  const {targetWatchlist, watchlistService} = useContext(WatchlistContext)
  const  {setTargetCoinChart} = useContext(ChartContext);
  const [coinsArray, setCoinsArray] = useState([])
  
  const navigate = useNavigate();
  useEffect(() => {
    setCoinsArray(targetWatchlist.cryptoList)
  }, [targetWatchlist]);
  
  const backClick = () => {
    navigate('/watchlist');
  }
  
  const deleteCoin = (crypto) => {
    watchlistService.deleteCoinFromList(crypto, targetWatchlist);
    let filteredArray = coinsArray.filter(coin => coin.id !== crypto.id);
    setCoinsArray(filteredArray);
  }
  const goToCoin = (crypto) => {
    setTargetCoinChart(crypto);
    navigate('/charts')
  }
  return (
    <div className='target-list-container'>
        <div className="long-container">
          <div className="table-scroll">
            <table className='target-list-table'>
                <thead>
                    <tr className='coin-row header'>
                        <td></td>
                        <td className='img-ticker-container'>Symbol</td>
                        <td className='name-container'>Name</td>
                        <td className='movement-container'>Last 24hr</td>
                        <td className='price-container'>Price</td>
                        <td className='change-container'>Change</td>
                        <td className='percent-container'>% Change</td>
                        <td className='low-high-container'>24hr High/Low</td>
                        <td className='volume-container'>Volume</td>
                        <td></td>
                    </tr> 
                </thead>
                <tbody>
                    {coinsArray.map(coin => (
                      <tr className='coin-row'>
                        <td><i style={{cursor: "pointer"}} class="fas fa-times" onClick={() => deleteCoin(coin)}></i></td>
                        <td className='img-ticker-container'>
                          {coin.ticker}
                          <img src={coin.img} alt="coin-logo" />
                        </td>
                        <td className='name-container'><p onClick={() => goToCoin(coin)}>{coin.name}</p></td>
                        <td className='movement-container'><MarketMiniChart  coinId={coin.id} interval={1}/></td>
                        <td className='price-container'>${formatNumber(coin.price)}</td>
                        <td style={{color: `${coin.day_price_change < 0 ? "var(--blood)" : "var(--money)"}`}} className='change-container'>{coin.day_price_change}</td>
                        <td style={{color: `${coin.day < 0 ? "var(--blood)" : "var(--money)"}`}} className='percent-container'>{coin.day}%</td>
                        <td className='low-high-container'>${coin.dayHigh} / ${coin.dayLow}</td>
                        <td className='volume-container'>${formatNumber(coin.dailyVolume)}</td>
                        <td></td>
                    </tr>
                    ))}
                </tbody>
            </table>
          </div>
            <Button className='back-btn' onClick={backClick}>
              <i class="fas fa-arrow-left"></i>
              <p style={{color: 'white'}}>Back to Watchlist</p>
            </Button>
        </div>
    </div>
  );
}

export default TargetWatchlist;
