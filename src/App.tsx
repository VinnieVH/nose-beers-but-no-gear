import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Roster from './pages/Roster'
import Raids from './pages/Raids'
import About from './pages/About'

const App = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen bg-pandaria-paper dark:bg-pandaria-darkpaper text-pandaria-dark dark:text-pandaria-light transition-colors duration-300">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/roster" element={<Roster />} />
              <Route path="/raids" element={<Raids />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
