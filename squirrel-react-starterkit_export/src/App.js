import React, { lazy } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
  } from 'recoil';
// import { useAuth } from './Hook/useAuth';

const Home = lazy(() => import('./Screens/Home'));
const Private = lazy(() => import('./Screens/Private'));
const Login = lazy(() => import('./Screens/Login'));
const NotFound = lazy(() => import('./Screens/NotFound'));

const App = () => {
	return (
			<RecoilRoot>
		<Router>
			<Routes>
				<Route path="/private" exact element={<Private />}/>
				<Route path="/" exact element={<Home />} />
				<Route path="/login" exact element={<Login />} />
				<Route element={<NotFound/>} />
			</Routes>
		</Router>
		</RecoilRoot>
	);
};

// eslint-disable-next-line 
const PrivateRoute = ({ component: Component, ...rest }) => {
	// const auth = useAuth()
	// const user = auth.loggedIn() && auth.user
	const user = true
	return (<Route
		{...rest}
		render={props =>
			user ? <Component {...props} /> : <Link to={{ pathname: "/login", search: `?next=${props.location.pathname}` }} />
		}
	/>)
};

export default App;