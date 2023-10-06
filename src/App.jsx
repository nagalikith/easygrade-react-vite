import './App.css'
import Home from './pages/Home'
import { Routes, Route ,BrowserRouter} from 'react-router-dom'
import Account from './pages/account/Account'
function App() {

  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/account" element={<Account/>}/>
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
