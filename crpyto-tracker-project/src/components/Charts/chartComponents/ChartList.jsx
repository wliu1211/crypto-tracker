import React, {useEffect, useContext, useState} from 'react'
import { ChartContext, WatchlistContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../../miscFunctions';
import { Button, IconButton, TextField } from '@material-ui/core';
import Modal from '../../Modal/Modal';
import AddCoinForm from '../../AddCoinForm/AddCoinForm';


function ChartList({coinsList}) {
    const {setTargetCoinChart} = useContext(ChartContext);
    const {watchlistService} = useContext(WatchlistContext);
    const [watchlistArray, setWatchlistArray] = useState([]);
    const [listModelOpen, setListModelOpen] = useState(false);
    const [listDropdown, setListDropdown] = useState(false);
    const [listInput, setListInput] = useState('');
    const [coinsArray, setCoinsArray] = useState(false);
    const [coinSearchOpened, setCoinSearchOpened] = useState(false);
    const [targetList, setTargetList] = useState({});
    const [selectedListText, setSelectedListText] = useState('All');
    const [targetListIndex, setTargetListIndex] = useState(null);

    useEffect(() => {
        setCoinsArray(coinsList);
        watchlistService.getAllLists().then(list => setWatchlistArray(list.data))
        
    }, []);
    useEffect(() => {
        watchlistService.getAllLists().then(list => setCoinsArray(list.data[targetListIndex].cryptoList))
        

    }, [coinSearchOpened]);

    const navigate = useNavigate();
    const createWatchlist = (e) => {
        e.preventDefault();
        if(listInput.length){
            watchlistService.addWatchlist(listInput);
            setListModelOpen(false);
            setListInput('');
        }
    }

    const coinClick = (crypto) => () => {
        setTargetCoinChart(crypto);
        setListDropdown(false);
        navigate('/charts')
    }
    
    const selectList = (targetWatchlist) => {
        let targetIndex = watchlistArray.indexOf(targetWatchlist);
        setTargetListIndex(targetIndex);
        setCoinsArray(targetWatchlist.cryptoList);
        setTargetList(targetWatchlist);
        setSelectedListText(targetWatchlist.name);
        setListDropdown(false);
    }
    
    const selectAllList = () => {
        setSelectedListText('All');
        setCoinsArray(coinsList);
        setListDropdown(false); 
    }

    const addCoinToList = () => {
        setCoinSearchOpened(true);
    }
    

    return (
        <>
            <div className="grid-watchlist">
                <div className="list-container">
                    <div className="list-header">
                        <Button className="watchlist-switcher" onClick={() => setListDropdown(!listDropdown)}>
                            <p>{selectedListText}</p>
                            <i class="fas fa-angle-down"></i>
                        </Button>
                        {listDropdown ? <div className="watchlist-dropdown">
                            <p onClick={selectAllList}>All</p>
                            {watchlistArray.map(list => (
                                <p key={list._id} onClick={() => selectList(list)}>{list.name}</p>
                            ))}
                        </div> : null}
                        <div className="header-right">
                            <Button className="watchlist-container" onClick={() => setListModelOpen(true)}>
                                <i class="fas fa-plus"></i>
                                <p>New List</p>
                            </Button>
                            <IconButton className="add-coin-btn" onClick={addCoinToList}>
                                <span style={{fontSize: "1.15rem"}} className="material-icons">add_chart</span>
                            </IconButton>
                        </div>
                    </div>
                    <div className="list-body">
                        <div className='body-header'>
                            <p>Symbol</p>
                            <p>Price</p>
                            <p style={{transform: "translateX(20px)"}}>Chg</p>
                            <p>Chg %</p>
                        </div>
                        <div className="body-body">
                            {coinsArray.length ? 
                                coinsArray.map(coin => (
                                    <div key={coin._id} className="list-item-container" onClick={coinClick(coin)}>
                                        <div className="list-left">
                                            <div className="item-name">
                                                <img src={coin.img} alt="coin-logo" />
                                                <p>{coin.ticker}</p>
                                            </div>
                                            <div className="item-price">${formatNumber(coin.price)}</div>
                                        </div>
                                        <div className="list-right">
                                            <div className='chg-container'>
                                                <div style={{color: `${coin.day_price_change < 0 ? "var(--blood)" : "var(--money)"}`}}  className="item-daily-price-change">{formatNumber(coin.day_price_change)} </div>

                                            </div>
                                            <div className='chg-percent-container'>
                                                <div style={{color: `${coin.day < 0 ? "var(--blood)" : "var(--money)"}`}}  className="item-daily-percent-change">{coin.day}%</div>

                                            </div>

                                        </div>
                                    </div>
                                ))
                                : 
                                <div className='empty-list-container'>
                                    <p>No coins here</p>
                                    <Button className="add-coin-btn" onClick={addCoinToList}>
                                        <i class="fas fa-plus"></i>
                                        <p>Add Coin</p>
                                    </Button>
                                </div>
                            }

                        </div>

                    </div>
                </div>
            </div>
            <Modal title="Create New List" isOpen={listModelOpen} close={setListModelOpen}>
                <form className='create-watchlist-form' onSubmit={createWatchlist}>
                    <TextField 
                        label="Watchlist Name"
                        onChange={({target:{value}}) => setListInput(value)} 
                        value={listInput} 
                        InputLabelProps={{style: {color: "silver"}}}
                        InputProps={{style: {color: "white"}}}
                     />
                    <br />
                    <input className='create-watchlist-btn submit-btn' type="submit" value="Add"/>
                </form>
            </Modal>
            <AddCoinForm opened={coinSearchOpened} close={setCoinSearchOpened} targetList={targetList} />
        </>
    )
}

export default ChartList
