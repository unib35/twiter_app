import React, { useState } from 'react';
import { authService } from 'fbase';


const Auth = () => {
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
			<span onClick={toggleAccount}>{NewAccount ? "Log in" : "Create Account"}</span>
				<div>
				<button>Continue with Google</button>
				<button>Continue with Github</button>
				</div>
		</div>
		)
}

export default Auth