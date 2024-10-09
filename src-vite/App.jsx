import './App.css'
import Home from './pages/Home'
import Gradebook from './pages/Gradebook'
import { Routes, Route ,BrowserRouter} from 'react-router-dom'
import Account from './pages/account/Account'
function App() {

  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Gradebook/>}/>
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
