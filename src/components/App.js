import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
	
	const [Init, setInit] = useState(false);
	const [Logged, setLogged] = useState(false);
	const [UserObj, setUserObj] = useState(null);
	
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if(user) {
				setLogged(true)
				setUserObj({
					displayName: user.displayName,
					uid: user.uid,
					updateProfile: (args) => user.updateProfile(args),
				});
			} else {
				setLogged(false)
			}
			setInit(true)
		})
	}, [])
	
	const refreshUser = () => {
		const user = authService.currentUser
		setUserObj({
					displayName: user.displayName,
					uid: user.uid,
					updateProfile: (args) => user.updateProfile(args),
				});
	}
	
  return (
	<>
		{Init ? (
		 <AppRouter
			 refreshUser={refreshUser}
			 Logged={Logged}
			 userObj={UserObj}
		/>) : 
		 "Initializing..."}
		
  	</>
  )
	
}

export default App;
