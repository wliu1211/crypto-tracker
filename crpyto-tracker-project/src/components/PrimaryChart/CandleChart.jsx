import React, {useState, useEffect, useContext} from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { MainContext } from '../../App'
import PropTypes from 'prop-types'
import {capitalize} from '../../miscFunctions'
const moment = require('moment')


function CandleChart({coinId, interval, measurement, ticker}) {
    const {cryptoService} = useContext(MainContext);
    const [dataPoint, setDataPoint] = useState([]);

    
    
    useEffect(() => {
        cryptoService.getCoinOhlcData(coinId, interval).then(data => {
            setDataPoint([...data])
        })
        

    }, [coinId, interval, measurement])
    const options = {
        yAxis: {
            gridLineColor: "rgb(54,60,60)",
            title: {
                reserveSpace: false,
                text: '',
                margin: 0,
            },
            labels: {
                format: '${text}',
                style: {
                    "color": "#fefefe"
                }
            }
        },
        chart: {
            height: 400,
            width:700,
            backgroundColor: "none",
            spacingTop: 30,

          },
        series: [{
          data: [...dataPoint],
          showInLegend: false,
          type: 'candlestick',
          id: 'aapl'
        }],
        title: {
            text: `${ticker}'s Chart`,
            style: {
                "color": "#236BD6"
            }
        },
        xAxis: {
            labels: {
                format: '{value:%b-%d-%y}'
            }
        },
        tooltip: {
            formatter: function() {
                const {x: time, close, high, low, open} = this.point.options;
                return  '<b>' + moment(new Date(time)).format("ddd, MMM D YYYY, h:mm:ss A") + '</b><br /><br /> <b>O: </b>$' + (open >= 1 ? open.toFixed(2) : open.toPrecision(2)) + '<br /> <b>H: </b>$' + (high >= 1 ? high.toFixed(2) : high.toPrecision(2)) + '<br /> <b>L: </b>$' + (low >= 1 ? low.toFixed(2) : low.toPrecision(2)) + '<br /> <b>C: </b>$' + (close >= 1 ? close.toFixed(2) : close.toPrecision(2));
            }
        }
      }
      

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}


CandleChart.propTypes = {
    coinId: PropTypes.string,
    interval: PropTypes.number
}



export default CandleChart
