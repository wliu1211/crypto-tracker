import React, { useState, useEffect, useContext } from 'react';
import Modal from '../Modal/Modal';
import "./AddCoinForm.css"
import { IconButton } from '@material-ui/core';
import { MainContext, WatchlistContext } from '../../App';
import { formatNumber } from '../../miscFunctions';


function AddCoinForm({opened, close, targetList}) {
    const {cryptoService} = useContext(MainContext);
    const {watchlistService} = useContext(WatchlistContext);
    const [cryptoList, setCryptoList] = useState([])
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        setCryptoList(cryptoService.cryptoList);
        setSearchInput('');
        
    }, [opened]);
    
    const addItemToList = (crypto) => {
        watchlistService.addCoinToList(targetList, crypto);
        close();
    }

    const searchCoin = ({target: {value}}) => {
        setSearchInput(value);
        onkeyup =() => {
            let filteredList = cryptoService.cryptoList.filter(crypto => crypto.ticker.trim().toLowerCase().includes(value.trim().toLowerCase()) || crypto.name.trim().toLowerCase().includes(value.trim().toLowerCase()));
            setCryptoList(filteredList);
        }
    }
    
    
  return (
    <Modal title="Add Coin" isOpen={opened} close={close}>
        <form className='add-coin-form' onSubmit={() => addItemToList(cryptoList[0])}>
            <div className="search-coin-container">
                <input type="text" onChange={searchCoin} value={searchInput}/>
                <IconButton className='coin-search-btn'>
                    <i class="fas fa-search"></i>
                </IconButton>
            </div>
            <div className="coin-results-container">
                <div className="item-description-container">
                        <div className="left-side">
                            <div className='ticker-container'>
                                <p>Symbol</p>
                            </div>
                            <div className='name-container'>
                                <p>Name</p>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className='price-container'>
                                <p>Price</p>
                            </div>
                            <div className='percent-container'>
                                <p>Price Change</p>
                            </div>
                        </div>
                </div>
                {cryptoList.map(crypto => (
                    <div key={crypto._id} className="coin-item-container" onClick={() => addItemToList(crypto)}>
                        <div className="left-side">
                            <div className='ticker-container'>
                                <p>{crypto.ticker}</p>
                            </div>
                            <div className='name-container'>
                                <p>{crypto.name}</p>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className='price-container'>
                                <p>${formatNumber(crypto.price)}</p>
                            </div>
                            <div className='percent-container'>
                                <p style={{color: `${crypto.day < 0 ? "var(--blood)" : "var(--money)"}`}}>{crypto.day}%</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </form>
    </Modal>

  );
}

export default AddCoinForm;
