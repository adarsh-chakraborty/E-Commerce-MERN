import axios from 'axios';
import {
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USERS_LIST_FAILURE,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAILURE
} from '../constants/userConstants';

import { ORDER_LIST_RESET } from '../constants/orderConstants';
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    console.log('ERR', err);
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(
      `/api/users/${id}`,

      config
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_RESET });
  dispatch({ type: USERS_LIST_RESET });
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_LIST_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/users`, config);
    dispatch({ type: USERS_LIST_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USERS_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/users/${id}`, config);
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });
  }
};
