// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Giris from './Giris';

const Home = () => {
  return (
    <>
      <div className="arkaplan">
        <div className="kapsayici">
          <div className="ust">
            <div className="logo">
              <h1>Eray Karaoke</h1>
            </div>
            <div className="menu">
              <ul>
                <li><Link to="/Anasayfa" >Anasayfa</Link></li>
                <li><Link to="/SongList" >Şarkı Listesi</Link></li>
                <li><Link to="/FavoriSarki" >Favoriler</Link></li>
                <li><Link to="/Hakkimizda" >Hakkımızda</Link></li>
                
                
                <li><Link to="/giris" style={{ color: 'white' }}>&#128100;</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="orta kapsayici">
        <div className="bolum1">
          <img src="https://www.atilimmed.org.tr/wp-content/uploads/2015/11/Karaoke-Mikrofon.jpg" alt="Kapak resmi" />
        </div>
        <div className="bolum2">
          <div className="kutu">
            <img src="https://picsum.photos/290/180" alt="" />
            <h2>Karaoke nedir ?</h2>
            <p>Karaoke, kişilerin orijinal müzik kayıtları eşliğinde şarkı söylemelerini sağlayan bir eğlence ve aktivite biçimidir. Genellikle bir ekranda şarkı sözleri gösterilir ve katılımcılar bu metinleri kullanarak şarkıyı seslendirirler.
            </p>
          </div>
          <div className="kutu">
            <img src="https://picsum.photos/290/180" alt="" />
            <h2>Karaoke insana ne katar ?</h2>
            <p>Karaoke, kullanıcılara müzikle etkileşim kurma, eğlenme ve kendi şarkı performanslarını sergileme imkanı tanıyarak kişisel keyif ve sosyal deneyim sunar. Aynı zamanda şarkı söyleme becerilerini geliştirme ve stres atma gibi faydaları bulunabilir. </p>
          </div>
          <div className="kutu">
            <img src="https://picsum.photos/290/180" alt="" />
            <h2>Kimler karaoke yapabilir ?</h2>
            <p>Sitemize kayıt olan herkes karaoke yapabilir. </p>
          </div>
        </div>
      </div>

      
      <div className="arkaplan">
        <div className="alt kapsayici">
          
        </div>
      </div>
    </>
  );
}

export default Home;
