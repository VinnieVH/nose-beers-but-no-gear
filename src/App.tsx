import { BrowserRouter, Route, Routes } from 'react-router'
import { GuildProvider } from './context/GuildContext'
import Home from './pages/Home'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Roster from './pages/Roster'
import Raids from './pages/Raids'
import About from './pages/About'

function App() {
  return (
       <BrowserRouter>
      <ThemeProvider>
        <GuildProvider>
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
        </GuildProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
