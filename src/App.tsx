import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import TickerStrip from './components/TickerStrip'
import Footer from './components/Footer'
import Home from './pages/Home'
import LearnLua from './pages/LearnLua'
import Frameworks from './pages/Frameworks'
import ServerSetup from './pages/ServerSetup'
import NotFound from './pages/NotFound'
import './App.css'

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [location.pathname, location.hash])

  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToHash />
      <Header />
      <TickerStrip />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lua" element={<LearnLua />} />
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="/server" element={<ServerSetup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  )
}
