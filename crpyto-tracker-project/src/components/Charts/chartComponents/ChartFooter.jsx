import React, { useState, useEffect, useContext } from 'react'

function ChartFooter({coin}) {
    const [usdInput, setUsdInput] = useState('')
    const [coinInput, setCoinInput] = useState('')
    const [swapClicked, setSwapClicked] = useState(false)

    useEffect(() => {
        setUsdInput('')
        setCoinInput('')
    }, [coin])



    const convertUSDtoCoin = ({target: {value}}) => {
        const regX = /^[0-9\b]+$/;
        let result = (value / coin.price)
        if (value === '' || regX.test(value)) {
            if (value && result < 1) {
                result = (value / coin.price).toPrecision(2);
            } else {
                result = (value / coin.price).toFixed(2);
            }
            setUsdInput(value)
            setCoinInput(result)
            
         }
    }
    const convertCoinToUSD = ({target: {value}}) => {
        const regX = /^[0-9\b]+$/;
        if (value === '' || regX.test(value)) {
            let result = value * coin.price;
            setUsdInput(result)
            setCoinInput(value)
        }
            
        }


    
    return (
        <div className="grid-footer">
            <div className="footer-container">
                <h3>{coin.ticker} to USD Converter</h3>
                <div className="converter-container">
                    {swapClicked ? 
                    <div className="crypto-container coin">
                        <img src={coin.img} alt="coin-logo" />
                        <div className='converter-name'>
                            <p>{coin.ticker}</p>
                            <p>{coin.name}</p>
                        </div>
                        <input type="text" onChange={convertCoinToUSD} value={coinInput} placeholder='0'/>
                    </div> : 
                    <div className="crypto-container stable-coin">
                        <img src="https://www.clipartmax.com/png/small/143-1437528_april-fools-demonetization-youtube.png" alt="coin-logo" />
                        <div className='converter-name'>
                            <p>USD</p>
                            <p>U.S Dollar</p>
                        </div>
                        <input type="text" onChange={convertUSDtoCoin} value={usdInput} placeholder='0'/>
                    </div>}
                    <div className='swap-container' onClick={() => setSwapClicked(!swapClicked)}>
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                    {swapClicked ? <div className="crypto-container stable-coin">
                        <img src="https://www.clipartmax.com/png/small/143-1437528_april-fools-demonetization-youtube.png" alt="coin-logo" />
                        <div className='converter-name'>
                            <p>USD</p>
                            <p>U.S Dollar</p>
                        </div>
                        <input type="text" onChange={convertUSDtoCoin} value={usdInput} placeholder='0'/>
                    </div> : 
                    <div className="crypto-container coin">
                        <img src={coin.img} alt="coin-logo" />
                        <div className='converter-name'>
                            <p>{coin.ticker}</p>
                            <p>{coin.name}</p>
                        </div>
                        <input type="text" onChange={convertCoinToUSD} value={coinInput} placeholder='0'/>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChartFooter
