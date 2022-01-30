import React, { useState, useEffect, useContext, createContext } from "react";
import jwt_decode from "jwt-decode";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
	return useContext(authContext);
};

const setAccessToken = token => token && sessionStorage.setItem('accessToken', token)

const setRefreshToken = token => token && localStorage.setItem('refreshToken', token)

const setOAuthToken = oAuth => sessionStorage.setItem('oAuth', oAuth)

const getAccessToken = () => sessionStorage.getItem('accessToken')

const getRefreshToken = () => localStorage.getItem('refreshToken')

const getOAuthToken = () => sessionStorage.getItem('oAuth')

const getUser = jwt => {
	let token = jwt || getAccessToken()
	let user = token ? jwt_decode(token) : null
	return user;
};

const isTokenExpired = token => {
	try {
		const decoded = jwt_decode(token);
		if (decoded.exp < Date.now() / 1000) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		localStorage.removeItem("refreshToken")
		sessionStorage.removeItem("accessToken")
		return false;
	}
};

const loggedIn = () => {
	const token = getAccessToken();
	if (!!token && !isTokenExpired(token)) {
		return true
	}
	return false
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
	const apiUrl = process.env.REACT_APP_API_URL
	const [user, setUser] = useState(null);
	const [load, setLoad] = useState(false);

	const [oAuth, setOAuth] = useState(null)

	const getAuthorization = async () => {
		setLoad(true);
		const formData = new FormData();
		formData.append("grant_type", "client_credentials");
		formData.append("client_id", process.env.REACT_APP_CLIENT_ID);
		formData.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);

		const response = await fetch(`${apiUrl}/authorization`, {
			method: 'POST',
			body: formData
		});

		const body = await response.json();
		setOAuth(body.access_token);
		setOAuthToken(body.access_token);
		setLoad(false);
		return body.access_token;
	}

	useEffect(() => {
		
		!oAuth && getAuthorization()
		return () => {
			getOAuthToken()
		}
		// eslint-disable-next-line
	}, [oAuth])

	const refreshToken = async refresh_token => {
		const r_token = refresh_token || getRefreshToken()

		if (!r_token) {
			return logout()
		}

		setLoad(true)
		return await fetch(`${apiUrl}/refresh_token`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getOAuthToken()}`,
			},
			method: "POST",
			body: JSON.stringify({
				refresh_token: r_token
			})
		}).then(async resp => {
			if (resp.status === 403) {
				getAuthorization().then(() => refreshToken(refresh_token))
			}
			return await resp.json()
		}).then(body => {
			setLoad(false)
			setAccessToken(body.access_token);
			setRefreshToken(body.refresh_token);
			setUser(getUser(body.access_token));
			return body;
		})
	};

	const login = async (email, password) => {
		setLoad(true)
		return await fetch(`${apiUrl}/auth`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getOAuthToken()}`,
			},
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password
			})
		}).then(async resp => {
			if (resp.status === 403) {
				getAuthorization().then(() => login(email, password))
			}
			return await resp.json()
		}).then(body => {
			setLoad(false)
			setAccessToken(body.access_token);
			setRefreshToken(body.refresh_token);
			setUser(getUser(body.access_token));
			return body;
		})
	};

	const logout = () => {
		localStorage.removeItem("refreshToken")
		sessionStorage.removeItem("accessToken")
		setUser(false)
	};

	const lost = async email => {
		setLoad(true)
		return await fetch(`${apiUrl}/lost`, {
			headers: {
				"Authorization": `Bearer ${getOAuthToken()}`,
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				email: email
			})
		}).then(async resp => {
			if (resp.status === 403) {
				getAuthorization().then(() => lost(email))
			}
			return await resp.json()
		}).then(body => {
			setLoad(false)
			return body
		})
	};

	const newPassword = async (password, token) => {
		setLoad(true)
		return await fetch(`${apiUrl}/password`, {
			headers: {
				"Authorization": `Bearer ${getOAuthToken()}`,
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				password: password,
				token: token
			})
		}).then(async resp => {
			if (resp.status === 403) {
				getAuthorization().then(() => newPassword(password, token))
			}
			return await resp.json()
		}).then(body => {
			setLoad(false)
			return body
		})
	};

	useEffect(() => {
		if (loggedIn()) {
			setUser(getUser())
		} else {
			refreshToken()
		}
		// eslint-disable-next-line
	}, []);

	// Return the user object and auth methods
	return {
		getAuthorization,
		getOAuthToken,
		getAccessToken,
		loggedIn,
		refreshToken,
		load,
		user,
		login,
		logout,
		lost,
		newPassword
	};
}