import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const FavoriSarki = ({ favorites, onRemoveFavorite }) => {
  const handlePlay = (songId) => {
 
    console.log(`Şarkı çal: ${songId}`);
    
  };

  return (
    <div className="arkaplan alt-kenar-10">
      <div className="ust kapsayici">
        <div className="logo">
          <h1>Eray Karaoke</h1>
        </div>
        <div className="menu">
          <ul>
            <li><Link to="/Anasayfa">Anasayfa</Link></li>
            <li><Link to="/SongList">Şarkı Listesi</Link></li>
            <li><Link to="/FavoriSarki">Favoriler</Link></li>
            <li><Link to="/Hakkimizda">Hakkımızda</Link></li>
            <li><Link to="/giris" style={{ color: 'white' }}>&#128100;</Link></li>
          </ul>
        </div>
      </div>

     
      <div className="favori-listesi">
        <h2>Favori Şarkılar</h2>
        {favorites && favorites.length > 0 ? (
          <ul>
            {favorites.map((song) => (
              <li key={song.id}>
                <FaHeart
                  onClick={() => onRemoveFavorite(song.id)}
                  className="heart-icon favorite"
                />
                
                <div className="song-info">
                  <p>{song.title}</p>
                  <p>{song.artist}</p>
                </div>
                
                <button onClick={() => handlePlay(song.id)}>Çal</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Favori şarkı bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriSarki;
