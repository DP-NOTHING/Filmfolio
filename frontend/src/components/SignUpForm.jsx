import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

export default function SignUpForm() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const Navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${process.env.REACT_APP_BACKEND}/signup/`, {
				username,
				email,
				password,
			})
			.then(() => {
				Navigate('/sign-in');
			});
	};
	return (
		<div className='formCenter'>
			<form
				// onSubmit={handleSubmit}
				className='formFields'
				// method='post'
			>
				<div className='formField'>
					<label
						className='formFieldLabel'
						htmlFor='username'
					>
						username
					</label>
					<input
						type='text'
						id='username'
						className='formFieldInput'
						placeholder='Enter your username'
						name='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className='formField'>
					<label
						className='formFieldLabel'
						htmlFor='password'
					>
						Password
					</label>
					<input
						type='password'
						id='password'
						className='formFieldInput'
						placeholder='Enter your password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='formField'>
					<label
						className='formFieldLabel'
						htmlFor='email'
					>
						E-Mail Address
					</label>
					<input
						type='email'
						id='email'
						className='formFieldInput'
						placeholder='Enter your email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className='formField'>
					<label className='formFieldCheckboxLabel'>
						<input
							className='formFieldCheckbox'
							type='checkbox'
							name='hasAgreed'
							// value={this.state.hasAgreed}
							// onChange={this.handleChange}
						/>{' '}
						I agree all statements in{' '}
						<a
							href='null'
							className='formFieldTermsLink'
						>
							terms of service
						</a>
					</label>
				</div>

				<div className='formField'>
					<button
						className='formFieldButton'
						onClick={handleSubmit}
					>
						Sign Up
					</button>{' '}
					<Link
						to='/sign-in'
						className='formFieldLink'
					>
						I'm already member
					</Link>
				</div>
			</form>
		</div>
	);
}
