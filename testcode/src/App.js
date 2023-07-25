import React, { useEffect, useState } from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import kakaologo from './image/kakaologo.png';
import { gapi } from 'gapi-script';

function App() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginStatus, setLoginStatus] = useState('');
	const [remember, setRememberStatus] = useState(false);
	const clientId =
		'59438726779-mukgldfttu2qm0oikt8jeirkra7bliji.apps.googleusercontent.com';
	const GoogleButton = ({ onSocial }) => {
		useEffect(() => {
			function start() {
				gapi.client.init({
					clientId,
					scopre: 'email',
				});
			}
			gapi.load('client:auth2', start);
		}, []);
	};
	const handleGoogleSuccess = response => {
		console.log(response);
	};

	const handlegoogleFailure = error => {
		console.log(error);
	};

	const handleKakaoSuccess = response => {
		console.log(response);
	};

	const handleKakaoFailure = error => {
		console.log(error);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (username === 'user' && password === 'pass') {
			setLoginStatus('테스트 성공');
			console.log(loginStatus);
		} else {
			setLoginStatus('로그인 될리가없지');
		}
	};

	return (
		<div className="container">
			<h1>리디드</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username"></label>
					<input
						className="loginbox"
						type="text"
						id="username"
						value={username}
						placeholder="이메일"
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password"></label>
					<input
						className="loginbox"
						type="password"
						id="password"
						value={password}
						placeholder="비밀번호"
						onChange={e => setPassword(e.target.value)}
						required
					/>
					<div>
						<input
							type="checkbox"
							id="remember"
							checked={remember}
							onChange={e => setRememberStatus(e.target.checked)}
						/>
						<label htmlFor="remember">로그인 유지</label>
					</div>
					<div>
						<button type="submit" className="login-button">
							로그인
						</button>
					</div>
				</div>
			</form>
			<p>
				<a href="#"> 아이디 찾기</a> |<a href="#"> 비밀번호 찾기</a> |
				<a href="#"> 회원가입</a>
			</p>

			<div>
				<h3 className="center">간편 로그인</h3>
				<div className="circle-container">
					<div>
						<GoogleLogin
							clientId={clientId}
							onSuccess={handleGoogleSuccess}
							onFailure={handlegoogleFailure}
							render={renderProps => (
								<button
									className="googlecircle"
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
								>
									<img
										src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
										alt="Google Logo"
										style={{ width: '30px', height: '30px' }}
									/>
								</button>
							)}
						/>
						<p style={{ marginLeft: '9px' }}>구글</p>
					</div>
					<div>
						<KakaoLogin
							token="de3df61746f8e67e3902e4ef963f6bd5"
							onSuccess={handleKakaoSuccess}
							onFailure={handleKakaoFailure}
							useRedirect={true}
							render={({ onClick, disabled }) => (
								<button
									className="kakaocircle"
									onClick={onClick}
									disabled={disabled}
								>
									<img
										src={kakaologo}
										alt="Kakao Logo"
										style={{ width: '30px', height: '30px' }}
									/>
								</button>
							)}
						/>
						<p style={{ marginLeft: '2px' }}>카카오</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
