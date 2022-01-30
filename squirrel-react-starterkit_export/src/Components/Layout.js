import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";

const Header = lazy(() => import('./Header'));

const Layout = ({ children, title }) => {
	return (
		<main className="d-flex flex-column h-100">
			<Helmet>
				<title>{title ? `${title} - Squirrel Starter Kit` : `Squirrel Starter Kit`}</title>
			</Helmet>
			<Header />
			{children}

		</main>
	);
};

Layout.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node
};

export default Layout;