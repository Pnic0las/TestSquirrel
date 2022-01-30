import React, { lazy } from 'react';

const Layout = lazy(() => import('../Components/Layout'));
const HomeLayout = lazy(() => import('../Components/HomeLayout'))


const Private = () => {
	return (
		<>
		<HomeLayout></HomeLayout>
		</>
	);
};

export default Private;