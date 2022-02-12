import React, {useState, useEffect, useContext} from 'react'
import { formatNumber } from '../../../miscFunctions';

function ChartHeader({coin}) {
    const [scaleMenuOpened, setScaleMenuOpened] = useState(false);
    const [scalePercent, setScalePercent] = useState(0);
    const [headerScaleValue, setHeaderScaleValue] = useState('24h')
    const [highValue, setHighValue] = useState(coin.dayHigh)
    const [lowValue, setLowValue] = useState(coin.dayLow)



    useEffect(() => {
        calculatePriceScale(coin.dayHigh, coin.dayLow, coin.price);
        setHeaderScaleValue('24h');
        setHighValue(coin.dayHigh);
        setLowValue(coin.dayLow);

    }, [coin])
    const calculatePriceScale = (high, low, current) => {
        let spreadDifference = high - low;
        let currentDifference = current - low;
        let percent = (currentDifference / spreadDifference) * 100;
        setScalePercent(Math.round(percent));
    }
    const headerScaleClick = (e) => {
        const [name] = e.target.attributes
        switch (name.value) {
            case "day":
                calculatePriceScale(coin.dayHigh, coin.dayLow, coin.price);
                setHighValue(coin.dayHigh);
                setLowValue(coin.dayLow);
                break;
            case "all-time":
                calculatePriceScale(coin.ath, coin.atl, coin.price);
                setHighValue(coin.ath);
                setLowValue(coin.atl);
                break;
                
            default:
                break;
        }
        setHeaderScaleValue(e.target.textContent)
        setScaleMenuOpened(false);

    }
    return (
        <div className="grid-header">
            <div className='header-wrapper'>
                <div className="header-left">
                    <div className='header-rank'>
                        <p>Rank #{coin.rank}</p>
                    </div>
                    <div className='header-coin'>
                            <img src={coin.img} alt="coin-logo" />
                        <p style={{margin: "0 10px"}}>{coin.name}</p>
                        <p>({coin.ticker})</p>
                    </div>
                    <div className="header-price-container">
                        <p className='header-price'>${formatNumber(coin.price)}</p>
                        <div style={{backgroundColor: `${coin.day < 0 ? "var(--blood)" : "var(--money)"}`}} className='percent-container'>
                            {coin.day < 0 ? <i class="fas fa-caret-down"></i> : <i class="fas fa-caret-up"></i>}
                            <p>{coin.day}%</p>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <div className="header-right-header">
                        <div className='header-container'>
                            <div className="container-items low">
                                <p>Low: <span>${formatNumber(lowValue)}</span></p>
                            </div>
                            <div className="container-items scale">
                                <div className='outer-scale'>
                                    <div style={{width: `${scalePercent}%`}} className='inner-scale'></div>
                                </div>
                            </div>
                            <div className="container-items high">
                                <p>High: <span>${formatNumber(highValue)}</span></p>
                            </div>
                            <div className="container-items options-container">
                                <div style={{borderRadius: `${scaleMenuOpened ? "10px 10px 0 0" : "10px"}`}} className="options" onClick={() => setScaleMenuOpened(!scaleMenuOpened)}>
                                    <p>{headerScaleValue}</p>
                                    <i class="fas fa-angle-down"></i>
                                </div>
                                {scaleMenuOpened ? 
                                <div className='dropdown'>
                                    <p name="day" onClick={headerScaleClick}>24h</p>
                                    <p name="all-time" onClick={headerScaleClick}>All-Time</p>
                                </div>
                                : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="header-right-body">
                        <div className="right-items">
                            <p>Market Cap</p>
                            <p className='item-value'>${formatNumber(coin.marketCap)}</p>
                            <div style={{backgroundColor: `${coin.market_cap_change_percent < 0 ? "var(--blood)" : "var(--money)"}`}} className='market-cap-change-container'>
                                {coin.day < 0 ? <i class="fas fa-caret-down"></i> : <i class="fas fa-caret-up"></i>}
                                    <p>{coin.market_cap_change_percent}%</p>
                            </div>
                        </div>
                        <div className="right-items">
                            <p>Diluted Market Cap</p>
                            <p className='item-value'>${formatNumber(coin.full_market_cap)}</p>
                        </div>
                        <div className="right-items">
                            <p>Volume</p>
                            <p className='item-value'>{formatNumber(coin.dailyVolume)}</p>
                        </div>
                        <div className="right-items">
                            <p>Circulating Supply</p>
                            <p className='item-value'>{formatNumber(coin.circ_supply)}</p>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartHeader
