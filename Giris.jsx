// Giris.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 600px;
  text-align: center;
`;

const FormSection = styled.div`
  flex: 1;
  margin: 0 10px;
  padding: 20px;
  transition: all 0.3s ease;
`;

const Baslik = styled.h1`
  margin-bottom: 20px;
  color: #333;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
`;

const GirisInputContainer = styled.div`
  position: relative;
`;

const GirisInput = styled.input`
  width: calc(100% - 30px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
`;

const SifreIcon = styled.span`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const GirisButon = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const Giris = () => {
  const navigate = useNavigate(); 

  const [girisEmail, setGirisEmail] = useState('');
  const [girisSifre, setGirisSifre] = useState('');
  const [kayitEmail, setKayitEmail] = useState('');
  const [kayitSifre, setKayitSifre] = useState('');
  const [girisEkranKucuk, setGirisEkranKucuk] = useState(false);
  const [kayitOlEkranKucuk, setKayitOlEkranKucuk] = useState(false);
  const [girisHata, setGirisHata] = useState(null);
  const [kayitHata, setKayitHata] = useState(null);
  const [sifreGoster, setSifreGoster] = useState(false);

  const handleGirisEmailChange = (e) => {
    setGirisEmail(e.target.value);
    setGirisHata(null);
  };

  const handleGirisSifreChange = (e) => {
    setGirisSifre(e.target.value);
    setGirisHata(null);
  };

  const handleKayitEmailChange = (e) => {
    setKayitEmail(e.target.value);
    setKayitHata(null);
  };

  const handleKayitSifreChange = (e) => {
    setKayitSifre(e.target.value);
    setKayitHata(null);
  };

  const girisYap = () => {
    if (!girisEmail || !girisSifre) {
      setGirisHata("E-posta ve şifre alanları boş bırakılamaz.");
      return;
    }

    
    navigate('/Anasayfa');
  };

  const kayitOl = () => {
    if (!kayitEmail || !kayitSifre) {
      setKayitHata("E-posta ve şifre alanları boş bırakılamaz.");
      return;
    }

    
    navigate('/Anasayfa');
  };

  const toggleGirisEkran = () => {
    setGirisEkranKucuk(!girisEkranKucuk);
    setKayitOlEkranKucuk(false);
  };

  const toggleKayitOlEkran = () => {
    setKayitOlEkranKucuk(!kayitOlEkranKucuk);
    setGirisEkranKucuk(false);
  };

  const toggleSifreGoster = () => {
    setSifreGoster(!sifreGoster);
  };

  return (
    <Container>
      <FormContainer>
        <FormSection style={{ transform: girisEkranKucuk ? 'scale(0.8)' : 'scale(1)' }}>
          <Baslik onClick={toggleGirisEkran}>Giriş</Baslik>
          {!girisEkranKucuk && (
            <>
              <GirisInputContainer>
                <GirisInput
                  type='email'
                  placeholder='Email'
                  value={girisEmail}
                  onChange={handleGirisEmailChange}
                />
              </GirisInputContainer>
              <GirisInputContainer>
                <GirisInput
                  type={sifreGoster ? 'text' : 'password'}
                  placeholder='Şifre'
                  value={girisSifre}
                  onChange={handleGirisSifreChange}
                />
                <SifreIcon onClick={toggleSifreGoster}>{sifreGoster ? '🙈' : '👁️'}</SifreIcon>
              </GirisInputContainer>
              {girisHata && <p style={{ color: 'red' }}>{girisHata}</p>}
              <GirisButon onClick={girisYap}>Giriş Yap</GirisButon>
            </>
          )}
        </FormSection>

        <FormSection style={{ transform: kayitOlEkranKucuk ? 'scale(0.8)' : 'scale(1)' }}>
          <Baslik onClick={toggleKayitOlEkran}>Kayıt Ol</Baslik>
          {!kayitOlEkranKucuk && (
            <>
              <GirisInputContainer>
                <GirisInput
                  type='email'
                  placeholder='Email'
                  value={kayitEmail}
                  onChange={handleKayitEmailChange}
                />
              </GirisInputContainer>
              <GirisInputContainer>
                <GirisInput
                  type={sifreGoster ? 'text' : 'password'}
                  placeholder='Şifre'
                  value={kayitSifre}
                  onChange={handleKayitSifreChange}
                />
                <SifreIcon onClick={toggleSifreGoster}>{sifreGoster ? '🙈' : '👁️'}</SifreIcon>
              </GirisInputContainer>
              {kayitHata && <p style={{ color: 'red' }}>{kayitHata}</p>}
              <GirisButon onClick={kayitOl}>Kayıt Ol</GirisButon>
            </>
          )}
        </FormSection>
      </FormContainer>
    </Container>
  );
};

export default Giris;
