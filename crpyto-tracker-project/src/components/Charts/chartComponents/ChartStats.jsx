import React from 'react'
import { formatNumber } from '../../../miscFunctions';

const moment = require('moment')




function ChartStats({coin}) {
    const {
        rank,
        ticker,
        price,
        marketCap,
        dailyVolume,
        dayLow, dayHigh,
        ath, atl,
        ath_change_percent, atl_change_percent,
        ath_date, atl_date,
    } = coin;
    let athDate = new Date(ath_date);
    let athYear = athDate.getFullYear();
    let athMonth = athDate.getMonth();
    let athDay = athDate.getDate();

    let atlDate = new Date(atl_date)
    let atlYear = atlDate.getFullYear();
    let atlMonth = atlDate.getMonth();
    let atlDay = atlDate.getDate();

    return (
        <div className="grid-stats">
            <div className="stats-container">
                <div className="stats-header">
                    <h2>{ticker} Price and Market Stats</h2>
                </div>
                <div className="stats-body">
                    <div className="stats-item-container">
                        <p>{ticker} Price</p>
                        <p>${formatNumber(price)}</p>
                    </div>
                    <div className="stats-item-container">
                        <p>Market Cap</p>
                        <p>${formatNumber(marketCap)}</p>
                    </div>
                    <div className="stats-item-container">
                        <p>Trading Volume</p>
                        <p>{formatNumber(dailyVolume)}</p>
                    </div>
                    <div className="stats-item-container">
                        <p>Volume / Market Cap</p>
                        <p>{(dailyVolume / marketCap).toFixed(3)}</p>
                    </div>
                    <div className="stats-item-container">
                        <p>24h Low / 24h High</p>
                        <p>${formatNumber(dayLow)} / ${formatNumber(dayHigh)}</p>
                    </div>
                    <div className="stats-item-container">
                        <p>Market Cap Rank</p>
                        <p>#{rank}</p>
                    </div>
                    <div className="stats-item-container">
                        <p>All-Time High</p>
                        <div className="all-time-container">
                            <p>${formatNumber(ath)} <span style={{color: `${ath_change_percent < 0 ? "var(--blood)" : "var(--money)"}`}}>{ath_change_percent}%</span></p>
                            <div className="all-time-date-container">
                                <p>{moment(ath_date).format('l')}  ({moment([athYear, athMonth, athDay]).fromNow()})</p>
                            </div>
                        </div>
                    </div>
                    <div className="stats-item-container">
                        <p>All-TimeLow</p>
                        <div className="all-time-container">
                            <p>${atl} <span style={{color: `${atl_change_percent < 0 ? "var(--blood)" : "var(--money)"}`}} >{formatNumber(atl_change_percent)}%</span></p>
                            <div className="all-time-date-container">
                                <p>{moment(atl_date).format('l')} ({moment([atlYear, atlMonth, atlDay]).fromNow()})</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartStats
