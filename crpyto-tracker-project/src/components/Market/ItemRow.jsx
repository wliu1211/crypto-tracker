import React, {useEffect, useContext, useState} from 'react'
import { ChartContext, WatchlistContext } from '../../App';
import MarketMiniChart from '../MarketMiniChart/MarketMiniChart';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../miscFunctions';

function ItemRow({crypto, watchlistArray}) {
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [addDropdownOpened, setAddDropdownOpened] = useState(false);
    const { watchlistService} = useContext(WatchlistContext);
    const  {setTargetCoinChart} = useContext(ChartContext);
    
    const navigate = useNavigate();
    
    
    const addCryptoBtnClick = (crypto) => () => {
        setSelectedCrypto(crypto.id);
        setAddDropdownOpened(!addDropdownOpened)           
    }
    const addCryptoToList = (crypto, list) => {
        watchlistService.addCoinToList(list, crypto);
        setAddDropdownOpened(false)
    }

    const handleCoinNameClick = (crypto) => () => {
        setTargetCoinChart(crypto);
        navigate('/charts')
    }
    
    return (
        <tr key={crypto.id} className='crypto-info-body'>
            <td className='add-to-watchlist'>
                <i className="fas fa-plus" onClick={addCryptoBtnClick(crypto)} ></i>
                {selectedCrypto === crypto.id && addDropdownOpened ? 
                <div className='dropdown-wrapper'>
                    <div className='connector'></div>
                    <div className='dropdown'>
                        <div className="dropdown-body">
                            {watchlistArray.length ? 
                                watchlistArray.map(list => (
                                    <p key={list.id} className='dropdown-item' onClick={() => addCryptoToList(crypto, list)}>{list.name}</p>
                                ))
                                :
                                <p>Watchlist is empty.</p>
                            }
                        </div>
                    </div>
                </div> 
                : null}
            </td>
            <td className='info-rank'>{crypto.rank}</td>
            <td className='info-name'>
                <div className='name-container'>
                    <div className='coin-img-wrapper'>
                        <img src={crypto.img} alt="" />
                        <p className='coin-name' onClick={handleCoinNameClick(crypto)}>{crypto.name}</p>
                    </div>
                    <p className='info-ticker'>{crypto.ticker.toUpperCase()}</p>
                </div>
            </td>
            <td className='info-price'>${formatNumber(crypto.price)}</td>
            <td style={{color: `${crypto.hour < 0 ? "var(--blood)" : "var(--money)"}`}} className='info-1hr'>{crypto.hour}%</td>
            <td style={{color: `${crypto.day < 0 ? "var(--blood)" : "var(--money)"}`}} className='info-24hr'>{crypto.day}%</td>
            <td style={{color: `${crypto.week < 0 ? "var(--blood)" : "var(--money)"}`}} className='info-7d'>{crypto.week}%</td>
            <td className='info-24vol'>${formatNumber(crypto.dailyVolume)}</td>
            <td className='info-mrkt-cap'>${formatNumber(crypto.marketCap)}</td>
            <td></td>
            <td className='info-prev-7d'><MarketMiniChart coinId={crypto.id} interval={7}/></td>
        </tr>
    )
}

export default ItemRow
