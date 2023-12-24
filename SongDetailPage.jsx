import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

const SongDetailPage = ({ songId }) => {
  const [songData, setSongData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        setToken(accessToken);

        const data = await fetchSong(accessToken, songId);
        setSongData(data);
      } catch (error) {
        console.error('Şarkı Verisi Alınamadı:', error);
      }
    };

    fetchData();
  }, [songId]);

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

      console.log('Song Data:', response.data);

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

  return (
    <div>
      {songData && token && (
        <div>
          <h2>{songData.name}</h2>
          <p>{songData.artists.map(artist => artist.name).join(', ')}</p>
          <ReactPlayer
            url={songData.preview_url}
            controls
            playing
            width="100%"
            height="80px"
          />
        </div>
      )}
    </div>
  );
};

export default SongDetailPage;
