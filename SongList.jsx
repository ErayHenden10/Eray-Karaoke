import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import FavoriSarki from './FavoriSarki';

const LYRICS_API_BASE_URL = 'https://api.lyrics.ovh/v1';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

const SongListPage = () => {
  const [songList, setSongList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [songData, setSongData] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songLyrics, setSongLyrics] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = await getAccessToken();
      const data = await fetchSongList(token, searchTerm);
      setSongList(data);
    } catch (error) {
      console.error('API Hatası:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    if (selectedSongId && songData) {
      const trackPreviewUrl = songData.preview_url;

      if (trackPreviewUrl) {
        audio.src = trackPreviewUrl;
        audio.play().catch((error) => {
          console.error('Şarkı Çalınamadı:', error);
        });
      }
    }
  }, [selectedSongId, songData, audio]);

  useEffect(() => {
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
    };
  }, [audio]);

  const getSongData = async (songId) => {
    try {
      const token = await getAccessToken();
      const data = await fetchSong(token, songId);
      setSongData(data);
      setSelectedSongId(songId);

      const lyrics = await fetchLyrics(data.artists[0].name, data.name);
      setSongLyrics(lyrics);

      openModal();
    } catch (error) {
      console.error('Şarkı Verisi Alınamadı:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFavorite = (songId) => {
    const isFavorite = favorites.includes(songId);

    if (isFavorite) {
      setFavorites(favorites.filter((id) => id !== songId));
    } else {
      setFavorites([...favorites, songId]);
    }
  };

  const playPauseToggle = async () => {
    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.error('Şarkı Çalınamadı:', error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  const handleDurationChange = () => {
    setDuration(audio.duration);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAccessToken = async () => {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: '181adc1402d54ab9b3cb7b7c90e47c5e',
          client_secret: 'fb1d724e2cee4e11953b5a452fa7733d',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error('Erişim Belirteci Alınamadı:', error.response?.status, error.response?.data);
      throw error;
    }
  };

  const fetchSong = async (token, songId) => {
    try {
      const response = await axios.get(`${SPOTIFY_API_BASE_URL}/tracks/${songId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        return response.data;
      } else {
        throw new Error('Şarkı verisi bulunamadı.');
      }
    } catch (error) {
      console.error('Şarkı Verisi Alınamadı:', error.response?.status, error.response?.data);
      throw error;
    }
  };

  const fetchSongList = async (token, searchTerm) => {
    try {
      const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          q: searchTerm,
          type: 'track',
        },
      });

      return response.data.tracks.items;
    } catch (error) {
      console.error('Şarkı Listesi Alınamadı:', error.response?.status, error.response?.data);
      throw error;
    }
  };

  const fetchLyrics = async (artist, title) => {
    try {
      const response = await axios.get(`${LYRICS_API_BASE_URL}/${artist}/${title}`);
      return response.data.lyrics;
    } catch (error) {
      console.error('Şarkı sözleri alınamadı:', error);
      return null;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="arkaplan">
      <div className="ust kapsayici">
        <div className="logo">
          <h1>Eray Karaoke</h1>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/Anasayfa">Anasayfa</Link>
            </li>
            <li>
              <Link to="/">Şarkı Listesi</Link>
            </li>
            <li>
              <Link to="/FavoriSarki">Favoriler</Link>
            </li>
            <li>
              <Link to="/Hakkımızda">Hakkımızda</Link>
            </li>
            <li>
              <Link to="/giris" style={{ color: 'white' }}>
                &#128100;
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="content">
        <div className="centered-container">
          <style>
            {`
              .centered-container {
                text-align: center;
                margin-top: 50px;
              }

              .search-container {
                margin-bottom: 20px;
              }

              .search-input {
                margin-top: 10px;
                padding: 5px;
              }

              .song-list {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
              }

              .song-item {
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px;
                margin-bottom: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
              }

              .song-item:hover {
                background-color: #f0f0f0;
              }

              .heart-icon {
                cursor: pointer;
              }

              .favorite {
                color: red;
              }

              .now-playing {
                margin-top: 20px;
              }

              .now-playing input {
                width: 100%;
              }

              .modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                padding: 0px;
                border-radius: 8px;
                z-index: 1000;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
              }

              .modal h2 {
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 2px solid #ccc;
                font-size: 1.5em;
              }

              .modal p {
                margin: 20px 0;
                font-size: 1.2em;
              }

              .modal div {
                display: flex;
                align-items: center;
                justify-content: space-between;
              }

              .modal input {
                flex: 1;
                margin: 0 10px;
              }

              .modal button {
                background-color: #4caf50;
                color: white;
                border: none;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                cursor: pointer;
                border-radius: 4px;
              }

              .modal button:hover {
                background-color: #45a049;
              }

              .lyrics-container {
                margin-top: 20px;
              }
            `}
          </style>
          <div className="search-container">
            <h2>Şarkı Listeleri</h2>
            <input
              type="text"
              className="search-input"
              placeholder="Şarkı Ara"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="song-list">
            {songList.map((song) => (
              <div
                key={song.id}
                className="song-item"
                onClick={() => getSongData(song.id)}
              >
                <span>{song.name} - {song.artists.join(', ')}</span>
                <FaHeart
                  onClick={() => toggleFavorite(song.id)}
                  className={`heart-icon ${favorites.includes(song.id) ? 'favorite' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="icerik ust-menu-ve-alt-menu">
          <div className="yan-menu"></div>
          <div className="alt kapsayici"></div>
        </div>
      </div>

      {selectedSongId && isModalOpen && (
        <div className="modal">
          <h2>Şu Anda Çalan Şarkı:</h2>
          <p>{songData?.name} - {songData?.artists.join(', ')}</p>

          <div>
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              step="1"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="lyrics-container">
            <h2>Şarkı Sözleri</h2>
            {songLyrics ? (
              <p>{songLyrics}</p>
            ) : (
              <p>Şarkı sözleri bulunamadı.</p>
            )}
          </div>

          <div>
            <button onClick={playPauseToggle}>
              {isPlaying ? 'Durdur' : 'Çal'}
            </button>
          </div>

          <div>
            <button onClick={closeModal}>Kapat</button>
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <FavoriSarki favorites={favorites} onRemoveFavorite={toggleFavorite} />
      )}
    </div>
  );
};

export default SongListPage;
