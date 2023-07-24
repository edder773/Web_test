import React, { useState } from 'react';
import { IconButton, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import EmailAuth from './EmailAuth';
import Profile from './Profile';
import './App.css';

type FormData = {
	member_name: string;
	email: string;
	password1: string;
	password2: string;
};

const isEmailValid = (email: string) => {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return emailRegex.test(email);
};

const BackButton: React.FC<{ onGoBack: () => void }> = ({ onGoBack }) => {
	return (
		<div>
			<IconButton
				color="primary"
				aria-label="back"
				onClick={onGoBack}
				style={{ fontSize: '14px' }}
			>
				<ArrowBackIcon /> 돌아가기
			</IconButton>
		</div>
	);
};

const UserInfoForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({
	onSubmit,
}) => {
	const [member_name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [invalidEmail, setInvalidEmail] = useState(false);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const emailValue = event.target.value;
		setEmail(emailValue);

		if (!isEmailValid(emailValue)) {
			setInvalidEmail(true);
		} else {
			setInvalidEmail(false);
		}
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handlePassword2Change = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPassword2(event.target.value);
	};

	const handleSubmit = () => {
		const formData: FormData = {
			member_name,
			email,
			password1,
			password2,
		};
		onSubmit(formData);

		axios
			.post('http://localhost:8080/email', { email })
			.then((response: any) => {
				console.log('이메일이 성공적으로 보내졌습니다.');
			})
			.catch((error: any) => {
				console.error('이메일 전송에 실패했습니다.', error);
			});
	};

	const handleGoBack = () => {
		console.log('뒤로');
	};
	return (
		<div>
			<BackButton onGoBack={handleGoBack} />
			<h1>회원가입</h1>
			<h3>리디드에 오신 것을 환영합니다.</h3>
			<div>
				<TextField
					className="signupform"
					label="*이름"
					variant="outlined"
					value={member_name}
					onChange={handleNameChange}
					margin="dense"
					helperText="이름을 입력해주세요"
					inputProps={{
						style: {
							backgroundColor: '#f5f5f5',
						},
					}}
				/>
			</div>

			<div>
				<TextField
					className="signupform"
					label="*이메일"
					variant="outlined"
					value={email}
					onChange={handleEmailChange}
					margin="dense"
					InputProps={{
						style: {
							backgroundColor: '#f5f5f5',
						},
						endAdornment: isEmailValid(email) && (
							<CheckIcon style={{ color: 'green' }} />
						),
					}}
					helperText={
						invalidEmail
							? '유효한 이메일을 입력해주세요'
							: isEmailValid(email)
							? ' '
							: '이메일을 입력해주세요'
					}
					error={invalidEmail}
				/>
			</div>
			<div>
				<TextField
					className="signupform"
					label="*비밀번호"
					type="password"
					variant="outlined"
					value={password1}
					onChange={handlePasswordChange}
					margin="dense"
					helperText="숫자, 특수문자를 조합한 8자리 이상으로 작성해주세요"
					inputProps={{
						style: {
							backgroundColor: '#f5f5f5',
						},
					}}
				/>
			</div>
			<div>
				<TextField
					className="signupform"
					label="*비밀번호 확인"
					type="password"
					variant="outlined"
					value={password2}
					onChange={handlePassword2Change}
					margin="dense"
					helperText="동일한 비밀번호를 입력해주세요"
					inputProps={{
						style: {
							backgroundColor: '#f5f5f5',
						},
					}}
				/>
			</div>
			<Link to={`/EmailAuth?email=${encodeURIComponent(email)}`}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					className="form-button-container"
				>
					이메일 인증하기
				</Button>
			</Link>
		</div>
	);
};

const App = () => {
	const [member_name, setMemberName] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');

	const handleFormSubmit = (data: FormData) => {
		console.log('Form Data:', data);
		setMemberName(data.member_name);
		setEmail(data.email);
		setPassword1(data.password1);
		setPassword2(data.password2);
	};

	return (
		<Router>
			<div className="container">
				<div>
					<Routes>
						<Route
							path="/"
							element={<UserInfoForm onSubmit={handleFormSubmit} />}
						/>
						<Route path="/EmailAuth" element={<EmailAuth />} />
						<Route
							path="/profile"
							element={
								<Profile
									member_name={member_name}
									email={email}
									password1={password1}
									password2={password2}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
