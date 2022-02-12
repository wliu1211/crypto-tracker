import React, {useEffect, useContext, useState} from 'react'
import { MainContext, ChartContext } from '../../App'
import ChartFooter from './chartComponents/ChartFooter';
import ChartHeader from './chartComponents/ChartHeader';
import ChartList from './chartComponents/ChartList';
import ChartMap from './chartComponents/ChartMap';
import ChartStats from './chartComponents/ChartStats';
import "./Charts.css"



function Charts() {

    const {setSelectedNavItem, cryptoService, } = useContext(MainContext);
    const { targetCoinChart} = useContext(ChartContext);
    const [selectedCoin, setSelectedCoin] = useState(targetCoinChart);
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setSelectedNavItem('charts');
        setAllCoins([...cryptoService.cryptoList])
        if (!targetCoinChart) {
            setSelectedCoin(crypto[0]);
        } else {
            setSelectedCoin(targetCoinChart);
        }
        setLoading(false);
        return () => {
            setSelectedCoin({})
        }
    }, [])
    useEffect(() => {
        setSelectedCoin(targetCoinChart);
    }, [targetCoinChart])

    return (
        <div className='charts-section'>
            <div className="long-container">
                {loading ? <div>Loading...</div> :
                    <div className="grid-container">
                        <ChartHeader coin={selectedCoin}/>
                        <ChartMap coin={selectedCoin}/>
                        <ChartList coinsList={allCoins}/>
                        <ChartStats coin={selectedCoin}/>
                        <ChartFooter coin={selectedCoin}/>
                    </div>
                }
            </div>

        </div>
    )
}

export default Charts
