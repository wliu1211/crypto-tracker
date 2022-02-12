import React, {useState, useEffect, useContext} from 'react'
import './Market.css'
import { MainContext, ChartContext, WatchlistContext } from '../../App';
import Modal from '../Modal/Modal';
import ItemRow from './ItemRow';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { PropagateLoader } from 'react-spinners';
import { TextField } from '@material-ui/core';
import { 
    sortObjName,
    sortObjRank,
    sortObjPrice,
    sortObjHour,
    sortObjDay,
    sortObjWeek,
    sortObjVolume,
    sortObjMarketCap
 } from '../../jsFunctions';
 const {v4: uuidv4,} = require('uuid')


function Market() {
    const {cryptoService, setSelectedNavItem,} = useContext(MainContext)
    const {watchlistService} = useContext(WatchlistContext);
    const {setTargetCoinChart} = useContext(ChartContext)
    const [cryptoList, setCryptoList] = useState(cryptoService.cryptoList);
    const [loaded, setLoaded] = useState(false);
    const [modal, setModal] = useState(false);
    const [listInput, setListInput] = useState('');
    const [searchInput, setSearchInput] = useState('')
    const [listArray, setListArray] = useState([]);
    const [selectedSort, setSelectedSort] = useState('');

    const [sortRankClicked, setSortRankClicked] = useState(false);
    const [sortNameClicked, setSortNameClicked] = useState(false);
    const [sortPriceClicked, setSortPriceClicked] = useState(false);
    const [sortHourClicked, setSortHourClicked] = useState(false);
    const [sortDayClicked, setSortDayClicked] = useState(false);
    const [sortWeekClicked, setSortWeekClicked] = useState(false);
    const [sortVolumeClicked, setSortVolumeClicked] = useState(false);
    const [sortMarketCapClicked, setSortMarketCapClicked] = useState(false);


    useEffect(() => {
        watchlistService.getAllLists().then(list => setListArray(list.data))
        cryptoService.getSupportedCoins(crypto => {
            setCryptoList([...crypto])
            setTargetCoinChart(crypto[0]);
            setLoaded(true);
        })
        setSelectedNavItem('market');
    }, [])

    const flipSort = (sortAsc) => {
        if (sortAsc) {
            return <i style={{pointerEvents: "none"}} class="fas fa-caret-down sort-icon"></i>
        } else {
            return <i style={{pointerEvents: "none"}} class="fas fa-caret-up sort-icon"></i>;
        }
    }
    const createWatchlist = (e) => {
        e.preventDefault();
        if(listInput.length){
            watchlistService.addWatchlist(listInput);
            setModal(false);
            setListInput('');
        }
    }
    const searchCoin = ({target: {value}}) => {
        setSearchInput(value);
        onkeyup =() => {
            let filteredList = cryptoService.cryptoList.filter(crypto => crypto.ticker.trim().toLowerCase().includes(value.trim().toLowerCase()) || crypto.name.trim().toLowerCase().includes(value.trim().toLowerCase()));
            setCryptoList(filteredList);
        }
    }


    const sortRank = () => {
        setSortRankClicked(!sortRankClicked);
        if (sortRankClicked) {
            setCryptoList(cryptoList.reverse(sortObjRank));
        } else setCryptoList(cryptoList.sort(sortObjRank));
    }
    const sortName = () => {
        setSortNameClicked(!sortNameClicked);
        if (sortNameClicked) {
            setCryptoList(cryptoList.reverse(sortObjName));
        } else setCryptoList(cryptoList.sort(sortObjName));
    }
    const sortPrice = () => {
        setSortPriceClicked(!sortPriceClicked);
        if (sortPriceClicked) {
            setCryptoList(cryptoList.reverse(sortObjPrice));
        } else setCryptoList(cryptoList.sort(sortObjPrice));
    }
    const sortHour = () => {
        setSortHourClicked(!sortHourClicked);
        if (sortHourClicked) {
            setCryptoList(cryptoList.reverse(sortObjHour));
        } else setCryptoList(cryptoList.sort(sortObjHour));
    }
    const sortDay = () => {
        setSortDayClicked(!sortDayClicked);
        if (sortDayClicked) {
            setCryptoList(cryptoList.reverse(sortObjDay));
        } else setCryptoList(cryptoList.sort(sortObjDay));
    }
    const sortWeek = () => {
        setSortWeekClicked(!sortWeekClicked);
        if (sortWeekClicked) {
            setCryptoList(cryptoList.reverse(sortObjWeek));
        } else setCryptoList(cryptoList.sort(sortObjWeek));
    }
    const sortVolume = () => {
        setSortVolumeClicked(!sortVolumeClicked);
        if (sortVolumeClicked) {
            setCryptoList(cryptoList.reverse(sortObjVolume));
        } else setCryptoList(cryptoList.sort(sortObjVolume));
    }
    const sortMarketCap = () => {
        setSortMarketCapClicked(!sortMarketCapClicked);
        if (sortMarketCapClicked) {
            setCryptoList(cryptoList.reverse(sortObjMarketCap));
        } else setCryptoList(cryptoList.sort(sortObjMarketCap));
    }

    const sortClicked = ({target: {dataset}}) => {
        setSelectedSort(dataset.name);
        switch (dataset.name) {
            case "rank":
                sortRank();
                break;
            case "name":
                sortName();
                break;
            case "price":
                sortPrice();
                break;
            case "hour":
                sortHour();
                break;
            case "day":
                sortDay();
                break;
            case "week":
                sortWeek();
                break;
            case "volume":
                sortVolume();
                break;
            case "market-cap":
                sortMarketCap();
                break;
            default:
                break;
        }
    }

    const listHeaderDetails = [
        {className: "info-rank", textContent: "#", name: "rank", sortState: sortRankClicked},
        {className: "info-name", textContent: "Coin", name: "name", sortState: sortNameClicked},
        {className: "info-price", textContent: "Price", name: "price", sortState: sortPriceClicked},
        {className: "info-1hr", textContent: "1hr", name: "hour", sortState: sortHourClicked},
        {className: "info-24hr", textContent: "24hr", name: "day", sortState: sortDayClicked},
        {className: "info-7d", textContent: "7d", name: "week", sortState: sortWeekClicked},
        {className: "info-24vol", textContent: "24hr Volume", name: "volume", sortState: sortVolumeClicked},
        {className: "info-mrkt-cap", textContent: "Market Cap", name: "market-cap", sortState: sortMarketCapClicked},
    ]
    
    return (
        <>
            <div style={{width: "100%"}}>
                <div className="long-container">
                    <div className="market-header-container">
                        <div className='search-container'>
                            <input type="text" placeholder='Name or Symbol' value={searchInput} onChange={searchCoin}/>
                            <IconButton>
                                <i class="fas fa-search"></i>
                            </IconButton>
                        </div>
                        <div className="create-watchlist-container">
                            <Button className='create-watchlist-btn' variant="contained" onClick={()=> setModal(true)}>
                                <i className="fas fa-plus"></i>
                                Create Watchlist       
                            </Button>
                        </div>
                    </div>
                    {!!loaded 
                    ? <div className="table-scroll">
                        <table className='crypto-info-table'>
                            <thead>
                                <tr className='crypto-info-header'>
                                    <th></th>
                                    {listHeaderDetails.map(item => (
                                        <th key={uuidv4()} className={item.className} data-name={item.name} onClick={sortClicked}>{item.textContent}{selectedSort === item.name ? flipSort(item.sortState) : null}</th>
                                    ))}
                                    <th></th>
                                    <th className='info-prev-7d'>Last 7d</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cryptoList.map(crypto => (
                                <ItemRow key={crypto.id} crypto={crypto} watchlistArray={listArray}/>
                            ))}
                                
                            </tbody>
                        </table>
                    </div> : <div className="loading-screen"><PropagateLoader color="white"/></div>}
                </div>
            </div>
            <Modal title="Create New List" isOpen={modal} close={setModal}>
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
        </>
        
    )
}

export default Market
