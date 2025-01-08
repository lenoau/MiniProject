import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code'); // 인증 코드 추출

      if (!code) {
        console.error('Authorization code not found');
        return;
      }

      try {
        const response = await axios.post('http://10.125.121.117:8080/oauth2/token', //백엔드에서 처리하는 토큰 요청 url
          {
            code, redirectUri: 'http://10.125.121.117:8080/oauth2/callback',
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const accessToken = response.data.access_token;

        // 토큰 저장
        localStorage.setItem('authToken', accessToken);

        // 메인 페이지로 이동
        navigate('/');
      } catch (error) {
        console.error('Error while fetching the token:', error.message);
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>OAuth Callback</div>;
}
