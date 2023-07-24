import React, { useEffect } from 'react';
import axios from 'axios';

const GoogleLoginButton = () => {
	const clientId =
		'59438726779-mukgldfttu2qm0oikt8jeirkra7bliji.apps.googleusercontent.com';
	const redirectUri = 'http://localhost:3000/oauth/google/callback';

	const handleLogin = () => {
		const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
		window.location.href = authUrl;
	};

	useEffect(() => {
		const handleCallback = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const authorizationCode = urlParams.get('code');
			console.log('인가 코드:', authorizationCode);

			// if (authorizationCode) {
			// 	try {
			// 		const apiUrl = '#'; // 엔드포인트 URL
			// 		const response = await axios.post(apiUrl, {
			// 			code: authorizationCode,
			// 		});
			// 		console.log(response.data);
			// 	} catch (error) {
			// 		console.error(error);
			// 	}
			// }
		};

		if (window.location.search.includes('code=')) {
			handleCallback();
		}
	});

	return (
		<>
			<button onClick={handleLogin}>Google로 로그인</button>
		</>
	);
};

export default GoogleLoginButton;
