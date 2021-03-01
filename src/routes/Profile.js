import React from 'react'
import { authService } from '../fbase'
import { useHistory } from 'react-router-dom'

const Profile = () => {
	
	const history = useHistory();
	const LogoutHandler = () => {
		authService.signOut()
		history.push('/')
		alert('Success To Logout')
	}
	
	return (
		<>
			<button onClick={LogoutHandler}>Log out</button>
		</>
	)
}


export default Profile