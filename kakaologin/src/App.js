import React, { useEffect } from 'react';
import axios from 'axios';

const SocialKakao = () => {
	const Rest_api_key = 'e1496c3a1b0232c4d6f84d511cf90255';
	const redirect_uri = 'http://localhost:3000/oauth/kakao/callback';

	const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

	const handleLogin = () => {
		window.location.href = kakaoURL;
	};

	useEffect(() => {
		const handleCallback = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const authorizationCode = urlParams.get('code');
			console.log('인가 코드:', authorizationCode);
			if (authorizationCode) {
				const apiUrl = '#'; // 엔드포인트
				try {
					const response = await axios.post(apiUrl, {
						code: authorizationCode,
					});
					console.log(response.data);
				} catch (error) {
					console.error(error);
				}
			}
		};

		if (window.location.search.includes('code=')) {
			handleCallback();
		}
	}, []);

	return (
		<>
			<button onClick={handleLogin}>카카오 로그인</button>
		</>
	);
};

export default SocialKakao;
