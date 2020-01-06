import Cookies from 'js-cookie';
import settings from '../../settings/settings';
import axios from 'axios';

const login = credentials => {
  return axios({
    url: settings.restRoute + 'jwt-auth/v1/token/',
    method: 'post',
    data: credentials
  });
};

const logout = () => {
  //remove all Cookies
  Object.keys(Cookies.get()).forEach(cookie => Cookies.remove(cookie));
};

export const authService = {
  login,
  logout
};
