import Cookies from 'js-cookie';
import axios from 'axios';
import UserApi from '../../api/User';
import { actions, initialUser } from './userSlice';
import { toast } from "react-toastify";

const login = () => (dispatch) => {
  let token = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    return UserApi.current()
      .then(
        res => dispatch(actions.setUser(res.user)),
        err => err.response && toast(err.response.data.message)
      );
  }
  return Promise.resolve();
};

const logout = () => (dispatch) => {
  UserApi.logout().then(() => {
    Cookies.remove('token');
    dispatch(actions.setUser(initialUser));
  });
};

export { login, logout };