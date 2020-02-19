import axios from 'axios';
import moment from 'moment';


export const BASE_URL = process.env.REACT_APP_API_URL;

const getHeaderLocalStorage = () => JSON.parse(localStorage.getItem('token'));

const setHeaderLocalStorage = (res) => {
	const header = {
		Authorization: `${res.token_type} ${res.access_token}`,
	};
	localStorage.setItem('token', JSON.stringify(header));
};

const getExpireTokenLocalStorage = () => JSON.parse(localStorage.getItem('expire_token'));

const setExpireTokenLocalStorage = (res) => localStorage.setItem('expire_token', JSON.stringify(moment().add(res.expires_in, 's')));

const hasExpireToken = (expireToken) => expireToken === null;

const isExpiredToken = (expireToken) => moment().diff(expireToken) >= 0;

const hasToken = (token) => token === null;

export const getToken = async () => {
	let token = getHeaderLocalStorage();

	const expireToken = getExpireTokenLocalStorage();

	if (!(hasExpireToken(expireToken) && isExpiredToken(expireToken) && hasToken(token))) {
		const params = new FormData();
		params.set('grant_type', 'client_credentials');
		params.set('scope', '*');
		params.set('client_id', process.env.REACT_APP_API_CLIENT_ID);
		params.set('client_secret', process.env.REACT_APP_API_CLIENT_SECRET);
		try {
			const	res = await axios({
				method: 'post',
				url: `${BASE_URL}oauth/token`,
				data: params,
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
			});
			setHeaderLocalStorage(res.data);
			setExpireTokenLocalStorage(res.data);
			token = getHeaderLocalStorage();
		} catch (err) {
			console.log(err);
		}
	}

	return token;
};

export const apiCall = async (url, data, method) => {
  const token = await getToken();

	return axios({
		method,
		url: `${BASE_URL}api/${url}`,
		data,
		headers: token,
	});
};

export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};
