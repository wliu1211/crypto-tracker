import React, {useState, useEffect, useContext} from 'react'
import './Watchlist.css'
import Modal from '../Modal/Modal';
import { MainContext, WatchlistContext } from '../../App'
import { Button, IconButton, TextField } from '@material-ui/core';
import AddCoinForm from '../AddCoinForm/AddCoinForm';
import { useNavigate } from 'react-router-dom';



function Watchlist() {
    const {setSelectedNavItem, } = useContext(MainContext);
    const {setTargetWatchlist, watchlistService} = useContext(WatchlistContext);
    const [listArray, setListArray] = useState([]);
    const [newListForm, setNewListForm] = useState(false);
    const [listInput, setListInput] = useState('');
    const [coinSearchOpened, setCoinSearchOpened] = useState(false);
    const [dotsClicked, setDotsClicked] = useState(false);
    const [dotsItemEditClicked, setDotsItemEditClicked] = useState(false);
    const [dotsItemDeleteClicked, setDotsItemDeleteClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [targetEditListId, setTargetEditListId] = useState('');
    const [editInput, setEditInput] = useState('');
    const [targetList, setTargetList] = useState({});
    
    const navigate = useNavigate();
    
    useEffect(() => {
        setSelectedNavItem('watchlist');
        watchlistService.getAllLists().then(list => setListArray(list.data))
    }, []);
    useEffect(() => {
        watchlistService.getAllLists().then(list => setListArray(list.data))
    }, [newListForm, coinSearchOpened]);
    
    
    const createWatchlist = (e) => {
        e.preventDefault();
        if(listInput.length){
            watchlistService.addWatchlist(listInput);
            setNewListForm(false);
            setListInput('');
        }
    }
    
    const handleAddCoinClick = (list) => {
        setCoinSearchOpened(true);
        setTargetList(list);
    }
    
    const dotsItemEditClick = () => {
        setDotsClicked(false);
        setDotsItemEditClicked(!dotsItemEditClicked);
        setDotsItemDeleteClicked(false);
    }
    
    const dotsItemDeleteClick = () => {
        setDotsClicked(false);
        setDotsItemEditClicked(false);
        setDotsItemDeleteClicked(!dotsItemDeleteClicked);
    }

    const selectWatchlist = (list) => {
        if (list.cryptoList.length) {
            setTargetWatchlist(list);
            navigate(list.name)
        }
    }
    
    const handleEditChange = ({target: {value}}) => {
        setEditInput(value)
    }
    const editWatchlist = (list) => {
        let targetIndex = listArray.findIndex(target => target._id === list._id);
        setEditClicked(!editClicked)
        setTargetEditListId(list._id)
        if (editClicked) {
            const updatedData = {...listArray[targetIndex], name: editInput};
            listArray.splice(targetIndex, 1, updatedData);
            watchlistService.editWatchlist(editInput, list);
        } else {
            setEditInput(list.name)
        }
    }
    
    const deleteWatchlist = (list) => {
        watchlistService.deleteWatchlist(list._id);
        const filteredList = listArray.filter(listItem => listItem._id !== list._id)
        setListArray(filteredList);
    }
    
    return (
        <>
            <div className='watchlist-section'>
                <div className="long-container">
                    <div className="watchlist-header">
                        <Button className="new-list-container" onClick={() => setNewListForm(true)}>
                                <i class="fas fa-plus"></i>
                                <p >New List</p>
                        </Button>
                        <div className="edit-container">
                            <IconButton className='icon-btn' disabled={listArray.length ? false : true} onClick={() => setDotsClicked(!dotsClicked)}>
                                <i class="fas fa-ellipsis-h"></i>
                            </IconButton>
                            {dotsClicked ? 
                            <div className="edit-dropdown">
                                <p onClick={dotsItemEditClick}>Edit List Name</p>
                                <p onClick={dotsItemDeleteClick} >Delete List</p>
                            </div> : null}
                        </div>
                    </div>
                    <div className="watchlist-body">
                        <div className="watchlist-container">
                            {listArray.length ? 
                                listArray.map(list => (
                                    <div key={list._id} className="watchlist-card" >
                                        <div className="card-header">
                                            {targetEditListId === list._id && editClicked ? <input type="text" className="watchlist-edit-input" onChange={handleEditChange} value={editInput}/> : <h2>{list.name}</h2> }
                                            <div>
                                                <IconButton className='add-coin-btn icon-btn' onClick={() => handleAddCoinClick(list)}>
                                                    <span style={{fontSize: "1.75rem"}} className="material-icons">add_chart</span>
                                                </IconButton>
                                                {dotsItemEditClicked ? 
                                                <IconButton className='add-coin-btn icon-btn' onClick={() => editWatchlist(list)}>
                                                    {targetEditListId === list._id && editClicked ? <i class="fas fa-save"></i> : <i class="fas fa-edit"></i>}
                                                    
                                                </IconButton> : null}
                                                {dotsItemDeleteClicked ? 
                                                <IconButton className='add-coin-btn icon-btn' onClick={() => deleteWatchlist(list)}>
                                                    <i class="fas fa-trash-alt"></i>
                                                </IconButton> : null}
                                            </div>
                                        </div>
                                        <Button style={{width: "350px", height: "350px", display: "block", padding: "0", color: "white", fontSize: "1rem", textTransform: "none"}} onClick={() => selectWatchlist(list)}>
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                    {list.cryptoList.length ?
                                                        list.cryptoList.map(crypto => (
                                                            <tr key={crypto._id} className='crypto-list-item'>
                                                                <td className='watchlist-crypto-img'>
                                                                    <img src={crypto.img} alt="crypto logo" />
                                                                </td>
                                                                <td style={{width: "75px", textAlign: "left"}}>{crypto.name}</td>
                                                                <td style={{width: "50px", textAlign: "center", marginLeft: "10px"}}>{crypto.ticker.toUpperCase()}</td>
                                                                <td style={{width: "75px", textAlign: "right"}}>${crypto.price}</td>
                                                            </tr>
                                                        ))
                                                        : <p  style={{padding: "10px 15px"}}>This watchlist is empty.</p>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        </Button>
                                    </div>

                                ))
                            : <h2>You have no list created. 😢</h2>}
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Create New List" isOpen={newListForm} close={setNewListForm}>
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

export default Watchlist
