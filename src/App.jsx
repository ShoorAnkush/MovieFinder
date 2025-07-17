import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MovieFinder } from './components/MovieFinder'
import { Home } from './pages/Home'
import { Favorites } from './pages/Favorites'
import { NavBar } from './components/NavBar'
import { useEffect, useState } from 'react'

function App() {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("Favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("Favorites", JSON.stringify(favorites));
  },[favorites]);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home favorites={favorites} setFavorites={setFavorites} />} />
          <Route path='/favorites' element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
