import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage/Home'
import LandingPage from './components/LandingPage/LandingPage'
import PokeDetail from './components/Detail/PokeDetail'
import Form from './components/Form/Form'

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomePage/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/detail/:id' element={<PokeDetail/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  )
}

export default App
