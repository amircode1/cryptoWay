import { Route, Routes } from 'react-router-dom'
import HomePage from './page/HomePage'
import CategoryPage from './page/CategoryPage'
import TopGainersPage from './page/TopGainersPage'
import TopLosersPage from './page/TopLosersPage'
import ExchangesPage from './page/ExchangesPage'
import DexPage from './page/DexPage'
import DerivativesPage from './page/DerivativesPage'
import NftPage from './page/NftPage'
import WatchlistPage from './page/WatchlistPage'
import CoinPage from './page/CoinPage'
import NftSinglePage from './page/NftSinglePage'
function App() {


  return (
    <>
     <Routes>

      <Route path="/" element={<HomePage/>}/>
      <Route path='*' element={<HomePage/>}/>

        <Route path='/category' element={<CategoryPage/>}/>
        <Route path='/top-gainers' element={<TopGainersPage/>}/>
        <Route path='/top-losers' element={<TopLosersPage/>}/>
        <Route path='/exchanges' element={<ExchangesPage/>} />
        <Route path='/dex' element={<DexPage/>} />
        <Route path='/derivatives' element={<DerivativesPage/>} />
        <Route path='/nft-list' element={<NftPage/>} />
        <Route path='/watchlist' element={<WatchlistPage/>} />
        <Route path='/:web_slug' element={<CoinPage/>} />
        <Route path='/nft-list/:id' element={<NftSinglePage/>} />

     </Routes>
    </>
  )
}

export default App
