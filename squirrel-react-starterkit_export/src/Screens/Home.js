import React, { lazy } from 'react';


const Layout = lazy(() => import('../Components/Layout'));
const LoginLayout = lazy(() => import('../Components/LoginLayout'))

const Home = () => {
	return (
			<LoginLayout></LoginLayout>
	
	);
};

export default Home;