import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from 'components/Navigation'

const AppRouter = (props) => {	
	
	return (
		<Router>
			{/*Navigation이 실행되려면 props.Logged가 true 여야 된다.*/}
			{props.Logged && <Navigation />}
			<Switch>
				{props.Logged ? (
					<>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/profile">
						<Profile />
						</Route>
						<Redirect from='*' to ='/' />
					</>
				) : ( 
					<>
					<Route exact path="/">
						<Auth />
					</Route>
					<Redirect from='*' to ='/' />
					</>
				)}
			</Switch>
		</Router>
	)
}

export default AppRouter
