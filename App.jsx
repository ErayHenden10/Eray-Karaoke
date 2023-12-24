// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Giris from './Giris';
import SongListPage from './SongList'; 
import SongDetailPage from './SongDetailPage'; 
import './App.css';
import Hakkimizda from './Hakkimizda';
import FavoriSarki from './FavoriSarki.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Anasayfa" element={<Home />} />
        <Route path="/SongList" element={<SongListPage />} />
        <Route path="/Hakkimizda" element={<Hakkimizda />} />
        <Route path="/FavoriSarki" element={<FavoriSarki />} />
        <Route path="/DorduncuSayfa" element={<Home />} />
        <Route path="/giris" element={<Giris />} />
        <Route path="/song/:songId" element={<SongDetailPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
