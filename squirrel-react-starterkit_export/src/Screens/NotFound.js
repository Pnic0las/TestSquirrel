import React, { lazy } from 'react';

const Layout = lazy(() => import('../Components/Layout'));

const NotFound = () => {
	return (
		<Layout title="404">
			<div className="container">
				<h1 className="mt-5">404 not found</h1>
			</div>
		</Layout>
	);
};

export default NotFound;