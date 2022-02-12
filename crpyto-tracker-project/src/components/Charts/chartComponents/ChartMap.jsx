import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../App';
import CandleChart from '../../PrimaryChart/CandleChart';
import PrimaryChart from '../../PrimaryChart/PrimaryChart'
const {v4: uuidv4,} = require('uuid')

const selectedBgStyle = {
    backgroundColor: "rgba(107, 106, 106, 0.8)",
}

function ChartMap({coin}) {
    const [selectedMeasurement, setSelectedMeasurement] = useState('price')
    const [selectedTime, setSelectedTime] = useState('7');
    const [selectedChartType, setSelectedChartType] = useState('line')
    
    const gridItems = [
        {data: "1", text: "24h"},
        {data: "7", text: "7d"},
        {data: "14", text: "14d"},
        {data: "30", text: "30d"},
        {data: "90", text: "90d"},
        {data: "180", text: "180d"},
        {data: "365", text: "1y"},
        {data: "730", text: "2y"},
        {data: "max", text: "Max"},
    ]

    const timeClick = (e) => {
        setSelectedTime(e.target.dataset.time);
    }
    
    const setMeasurement = (e) => {
        setSelectedMeasurement(e.target.dataset.measurement);
        setSelectedChartType('line')
    }
    
    const setChartType = (e) => {
        if (selectedTime === '730' || selectedTime === 'max') {
            setSelectedTime('7')
        }
        setSelectedChartType(e.target.dataset.chart);
        
    }
    
    return (
        <div className="grid-chart">
            <div className="chart-outer-container">
                <div className="chart-container">
                    {selectedChartType === "line" ? <PrimaryChart coinId={coin.id} interval={selectedTime} measurement={selectedMeasurement} chartType={selectedChartType} ticker={coin.ticker}/> : <CandleChart coinId={coin.id} interval={selectedTime} measurement={selectedMeasurement} ticker={coin.ticker}/>}
                </div>
                <div className="chart-setting-container">
                    <div className='measure-type-container'>
                        <p style={selectedMeasurement === "price" ? selectedBgStyle : null} data-measurement="price" onClick={setMeasurement}>Price</p>
                        <p style={selectedMeasurement === 'market-cap' ? selectedBgStyle : null} data-measurement="market-cap" onClick={setMeasurement}>Market Cap</p>
                        <p style={selectedMeasurement === 'volume' ? selectedBgStyle : null} data-measurement="volume" onClick={setMeasurement}>Volume</p>
                    </div>
                    <div>
                        <div className="time-setting-grid-container">
                            {gridItems.map(item => (
                                selectedChartType !== "candle" || item.data !== '730' && item.data !== 'max' ? <div key={uuidv4()} style={selectedTime === item.data ? selectedBgStyle : null} className='grid-item' data-time={item.data} onClick={timeClick}>{item.text}</div> : null
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="chart-style-container">
                            <span style={selectedChartType === 'line' ? selectedBgStyle : null} className="material-icons" data-chart="line" onClick={setChartType}>show_chart</span>
                            {selectedMeasurement === "price" ? <span style={selectedChartType === 'candle' ? selectedBgStyle : null} className="material-icons" data-chart="candle" onClick={setChartType}>candlestick_chart</span> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartMap
