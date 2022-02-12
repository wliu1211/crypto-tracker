import react, {useState, useEffect,  createContext, useContext} from 'react';
import './App.css';
import Watchlist from './components/Watchlist/Watchlist';
import Charts from './components/Charts/Charts';
import Market from './components/Market/Market';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { CryptoService, WatchlistService } from './services';
import TargetWatchlist from './components/TargetWatchlist/TargetWatchlist';


const cryptoService = new CryptoService();
const watchlistService = new WatchlistService();

export const MainContext = createContext();
export const ChartContext = createContext();
export const WatchlistContext = createContext();

const MainProvider = ({children}) => {
  const context = {
    cryptoService,
    selectedNavItem: 'market',
    setSelectedNavItem: (nav) => {
      setMainContext({...mainContext, selectedNavItem: nav})
    },
  }

  const [mainContext, setMainContext] = useState(context);
  return(
    <MainContext.Provider value={mainContext}>
      {children}
    </MainContext.Provider>
  )

}

const ChartProvider = ({children}) => {
  const context = {
    targetCoinChart: {},
    setTargetCoinChart: (coin) => {
      setChartContext({...chartContext, targetCoinChart: coin})
    },
  }

  const [chartContext, setChartContext] = useState(context)
  return(
    <ChartContext.Provider value={chartContext}>
      {children}
    </ChartContext.Provider>
  )

}

const WatchlistProvider = ({children}) => {
  const context = {
    watchlistService,
    targetWatchlist: {},
    setTargetWatchlist: (list) => {
      setWatchlistContext({...watchlistContext, targetWatchlist: list})
    }
  }

  const [watchlistContext, setWatchlistContext] = useState(context);
  return (
    <WatchlistContext.Provider value={watchlistContext}>
      {children}
    </WatchlistContext.Provider>
  )
}


function Navbar() {
  const context = useContext(MainContext);
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/market');
  }, [])


  return (
    <nav className='side-nav'>
      <div className='nav-item-container'>
        <Link style={{textDecoration: 'none'}} to="/market"><i className={`fas fa-store-alt ${context.selectedNavItem.length && context.selectedNavItem === 'market' ? "selected" : "" }`}></i></Link>
      </div>
      <div className='nav-item-container'>
        <Link style={{textDecoration: 'none'}} to="/watchlist"><i class={`fas fa-star ${context.selectedNavItem.length && context.selectedNavItem === 'watchlist' ? "selected" : "" }`}></i></Link>
      </div>
      <div className='nav-item-container'>
        <Link style={{textDecoration: 'none'}} to="/charts"><i class={`fas fa-chart-line ${context.selectedNavItem.length && context.selectedNavItem === 'charts' ? "selected" : "" }`}></i></Link>
      </div>
    </nav>
  )
}




function App() {
  return (
    <div className="App">
          <header className="app-header">
            <div className='app-title'>
              <h3>Crypto Tracker</h3>
            </div>
          </header>
          <MainProvider>
            <ChartProvider>
              <WatchlistProvider>
                <BrowserRouter>
                  <div className='main-display-container'>
                    <Navbar />
                    <Routes>
                      <Route path="/market" exact element={<Market />} />
                      <Route path="/watchlist" exact element={<Watchlist />} />
                      <Route path="/watchlist/:id"  element={<TargetWatchlist />} />
                      <Route path="/charts" exact element={<Charts />} />
                    </Routes>
                  </div>
                </BrowserRouter>
              </WatchlistProvider>
            </ChartProvider>
          </MainProvider>
    </div>
  );
}

export default App;
