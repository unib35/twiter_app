import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fbase';


function Auth() {
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [NewAccount, setNewAccount] = useState(true);
	const [Error, setError] = useState("");
	
	const onChange = (e) => {
		const { target: {name, value}} = e;
		if(name === "email"){
			setEmail(value)
		} else if(name === "password") {
			setPassword(value)
		}
	}
	const onSubmit = async (e) => {
		console.log(Email, Password)
		//기본적으로 실행되는것을 막아줌 (새로고침)
		e.preventDefault();
		try {
			let data;
			if(NewAccount) {
				// create account
				data = await authService.createUserWithEmailAndPassword(
					Email, Password
				)
			} else {
				// log in
				data = await authService.signInWithEmailAndPassword(
					Email, Password
				)
			}
			console.log(data)
		} catch(err){
			setError(err.message);
			alert(err.message)
		}
	}
	const toggleAccount = () => {
		setNewAccount((prev) => !prev)
	}
	const onSocialClick = async (e) => {
		const {
		target: {name},
	} = e;
		let provider;
		if(name === "google") {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		} else if(name === "github") {
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}
		let data;
		data = await authService.signInWithPopup(provider)
		console.log(data)
	}
	
	
	return(
		<div>
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					value={Email}
					onChange={onChange}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					value={Password}
					onChange={onChange}
				/>
				<input
					type="submit"
					value={NewAccount ? "Create Account" : "Log in"}
				/>
				<br />
				{Error}
			</form>
			<button onClick={toggleAccount}>{NewAccount ? "∽" : "∽"}</button>
				<div>
				<button onClick={onSocialClick} name="google">
					Continue with Google
				</button>
				<button onClick={onSocialClick} name="github">
					Continue with Github
				</button>
				</div>
		</div>
		)
}

export default Auth