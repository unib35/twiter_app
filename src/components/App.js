import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
	
	const [Init, setInit] = useState(false)
	const [Logged, setLogged] = useState(false)
	
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if(user) {
				setLogged(true)
			} else {
				setLogged(false)
			}
			setInit(true)
		})
	}, [])
	
  return (
	<>
		{Init ? <AppRouter Logged={Logged}/> : "Initializing..."}
		<footer>&copy; Twitter Clone {new Date().getFullYear()}</footer>
  	</>
  )
	
}

export default App;
