import React, {useState, useEffect, useContext} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { MainContext } from '../../App'
import PropTypes from 'prop-types'
import {capitalize} from '../../miscFunctions'

const moment = require('moment')



function PrimaryChart({coinId, interval, measurement, ticker}) {
    const {cryptoService} = useContext(MainContext);
    const [dataPoint, setDataPoint] = useState([]);
    useEffect(() => {
        cryptoService.getCoinDataRange(coinId, interval).then(coinDataRange => {
            let dataPointsArray = [];
            switch (measurement) {
                case 'price':
                    coinDataRange.prices.forEach(data => {
                        let array = [];
                        array.push(data[0], data[1])
                        dataPointsArray.push(array);
                    })
                    break;
                case 'market-cap':
                    coinDataRange.market_caps.forEach(data => {
                        let array = [];
                        array.push(data[0], data[1])
                        dataPointsArray.push(array);
                    })
                    break;
                case 'volume':
                    coinDataRange.total_volumes.forEach(data => {
                        let array = [];
                        array.push(data[0], data[1])
                        dataPointsArray.push(array);
                    })
                    break;
                default:
                    break;
            }
            setDataPoint(dataPointsArray);
        })
    }, [coinId, interval, measurement]);


    const options = {
        title: {
            text: `${ticker}'s Chart`,
            style: {
                "color": "#236BD6"
            }
        },
        series: [{
          data: [...dataPoint],
          showInLegend: false,
        }],
        chart: {
        height: 400,
        width:700,
        backgroundColor: "none",
        spacingTop: 30,
      },
      crosshair:{
          className:undefined,
          color:"#cccccc",
          dashStyle:"Solid",
        snap:true,
        width:1,
        zIndex:2,
        },
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
                    color: "#fefefe"
                }
            },
        },
        xAxis: {
            labels: {
                format: '{value:%b-%d-%y}'
            }
        },
        tooltip: {
            formatter: function() {
                return  '<b>' + moment(new Date(this.x)).format("ddd, MMM D YYYY, h:mm:ss A") + '</b><br /><br /> <b>Price: </b>$' + (this.y >= 1 ? this.y.toFixed(2) : this.y.toPrecision(2));
            }
        }
      }
      
    return (
        <div style={{float: "right"}}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

// PrimaryChart.propTypes = {
//     coinId: PropTypes.string,
//     interval: PropTypes.number
// }

export default PrimaryChart
