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
				setUserObj(user);
			} else {
				setLogged(false)
			}
			setInit(true)
		})
	}, [])
	
  return (
	<>
		{Init ? <AppRouter Logged={Logged} userObj={UserObj} /> : "Initializing..."}
		<footer>&copy; Twitter Clone {new Date().getFullYear()}</footer>
  	</>
  )
	
}

export default App;
