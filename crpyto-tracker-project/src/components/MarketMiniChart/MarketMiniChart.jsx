import React, {useState, useEffect, useContext} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { MainContext } from '../../App'
import PropTypes from 'prop-types'



function MarketMiniChart({coinId, interval}) {
    const {cryptoService} = useContext(MainContext);
    const [dataPoint, setDataPoint] = useState([])
    useEffect(() => {
        cryptoService.getCoinDataRange(coinId, interval).then(coinDataRange => {
            let dataPointsArray = [];
            coinDataRange.prices.forEach(data => {
                let array = [];
                array.push(new Date(data[0]), data[1])
                dataPointsArray.push(array);
            })
            setDataPoint(dataPointsArray);
        })
    }, [])
    const options = {
        title: null,
        series: [{
          data: [...dataPoint],
          showInLegend: false
        }],
        chart: {
        height: 70,
        width:150,
        backgroundColor: "none",
      },
      yAxis: {
        labels: {enabled: false},
        tickPixelInterval:0,
        tickLength:0,
        visible: false,
      },
      xAxis: {
          labels: {enabled: false},
          visible: false,
          alignTicks:false,
          tickPixelInterval: 0,
          showEmpty:false,
          panningEnabled:false,
      },
        responsive: {  
            rules: [{  
                condition: {  
                maxWidth: 100,
                maxHeight: 100  
                },  
                chartOptions: {  
                legend: {  
                    enabled: false  
                }  
                }  
            }]  
        },
        tooltip : {
            enabled: false,
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

MarketMiniChart.propTypes = {
    coinId: PropTypes.string,
    interval: PropTypes.number
}

export default MarketMiniChart
