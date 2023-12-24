import React from 'react';
import { Link } from 'react-router-dom';

const Hakkimizda = () => {
  return (
    <div className="arkaplan alt-kenar-10">
      <div className="ust kapsayici">
        <div className="logo">
          <h1 style={{ color: 'gold', fontFamily: 'Arial, sans-serif' }}>Eray Karaoke</h1>
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

      <div className="icerik hakkimizda-container">
        <h2 style={{ color: '#4CAF50', textAlign: 'center', fontSize: '2em', marginBottom: '20px' }}>
          Hakkımızda
        </h2>
        <div className="hakkimizda-icerik" style={{ fontSize: '1.3em', textAlign: 'center', lineHeight: '1.6', color: 'white' }}>
          <p>
            Eray Karaoke, müzik tutkunları için özel olarak tasarlanmış bir platformdur. Her türlü müzik zevkine hitap eden geniş bir şarkı listesi sunuyoruz.
          </p>
          <p>
            Favori şarkılarınızı seçebilir, sözlerini inceleyebilir ve keyifli anlar yaşayabilirsiniz.
          </p>
          <p>
            Eray Karaoke'yi keşfetmeye hazır mısınız? Hemen şimdi şarkı listemize göz atın ve müzik dolu anların tadını çıkarın!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hakkimizda;
