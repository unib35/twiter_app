import React, { useState } from 'react'
import { authService, dbService } from '../fbase'
import { useHistory } from 'react-router-dom'

function Profile({userObj, refreshUser}) {
	
	const history = useHistory();
	
	const [NewDisplayName, setNewDisplayName] = useState(userObj.displayName);
	
	const LogoutHandler = () => {
		authService.signOut()
		history.push('/')
		alert('Success To Logout')
	}
	
	const getMyNweets = async() => {
		const Nweets = await dbService
			.collection("Nweets")
			.where("creatorId", "==", userObj.uid)
			.orderBy("createdAt")
			.get();
	}
	
	const onChange = (e) => {
		const {
			target: {value},
		} = e;
		setNewDisplayName(value);
	}
	
	const onSubmit = async (e) => {
		e.preventDefault();
		if(userObj.displayName !== NewDisplayName) {
			await userObj.updateProfile({
				displayName: NewDisplayName,
			})
			refreshUser();
		// window.location.reload(false);
		// await history.push('/profile')
		}
	}
	
	return (
		<>
		<form onSubmit={onSubmit}>
			<input
				onChange={onChange}
				type="text"
				placeholder="Display name"
				value={NewDisplayName}
			/>
			<input
				type="submit"
				value="Update Profile"
			/>
		</form>
			<button onClick={LogoutHandler}>Log out</button>
		</>
	)
}


export default Profile
	
	
	
	