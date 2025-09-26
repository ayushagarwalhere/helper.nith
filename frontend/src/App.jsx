import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home_bg from './components/Home_bg.jsx'
import Navbar from './components/navbar.jsx'
import About from './components/About.jsx'
import Features from './components/Features.jsx'
import Academic_guide from './components/academic_guide.jsx'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home_bg />} />
          <Route path='/about' element={<About />} />
          <Route path='/features' element={<Features />} />
          <Route path='/academic_guide' element={<Academic_guide />} />
        </Routes>


      </BrowserRouter>
    </div>

  )
}

export default App
