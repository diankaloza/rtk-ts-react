import { Routes, Route } from 'react-router-dom'

import { Navigation } from './components/navigation/Navigation'

import { FavouritesPages } from 'pages/FavouritesPages'
import { HomePage } from 'pages/HomePage'

export function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favourites' element={<FavouritesPages />} />
      </Routes>
    </>
  )
}
