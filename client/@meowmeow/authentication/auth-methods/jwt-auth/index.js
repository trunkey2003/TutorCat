import React from 'react'
import { useEffect, useState } from 'react'
import { httpClient } from '../../../modules/apiService/config'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from "react-redux";
import { setUser, deleteUser } from "../../../redux/actions/user";
import { setEng, setVi } from "../../../redux/actions/lang";
import { getLocalStorage, setLocalStorage } from "../../../modules"
import IntlMessages from '../../../utils/IntlMessages'

export const useProvideAuth = () => {
  const dispatch = useDispatch();
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loadingAuthUser, setLoadingAuthUser] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const fetchStart = () => {
    setLoading(true);
    setError('');
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError('');
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const fetchNoti = (txt) => {
    setLoading(false);
    setMessage(txt);
  };

  const messageSignin = (code) => {
    switch (code) {
      default:
        return ("Error!");
    }
  };

  const messageSignup = (code) => {
    switch (code) {
      default:
        return ("Error!");
    }
  };

  const messageChange = (code) => {
    switch (code) {
      default:
        return ("Error!");
    }
  };

  const bypassLogin = (user, callbackFun) => {
    setAuthUser(true);
  }

  const userLogin = (user, callbackFun) => {
    fetchStart();
    console.log(user)
    httpClient
      .post('/auth/sign-in/', user)
      .then(({ data }) => {
        if (data.statusCode == "200") {
          toast.success(data.message)
          setTimeout(() => {

            setAuthUser(true)
            setLoadingAuthUser(false)
          }, 1000)
          getInfo()
        }
        else {
          toast.error(data.message);
        }
      })
      .catch(function (error) {
        toast.error(error.message);
      })
  }

  const userSignup = (user) => {
    fetchStart();
    httpClient
      .post('/auth/sign-up/', user)
      .then(({ data }) => {
        fetchSuccess();
        if (data.statusCode == "200") {
          toast.success(data.message);
        }
        else {
          toast.error(data.message);
        }
      })
      .catch(function (error) {
        toast.error(error.message);
      });
  };


  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      //if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      //if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = () => {
    httpClient
      .get('/auth/sign-out/')
      .then(() => {
        setAuthUser(false)
        setLocalStorage("user", true, null)
        toast.success(<IntlMessages id="noti.signout.success"/>)
      })
      .catch(function (error) {
        toast.error(<IntlMessages id="noti.signout.error"/>)
      });
  };

  const getInfo = () => {
    httpClient
      .get('/user/get-info')
      .then(({ data }) => {
        if (data.statusCode == "200") {
          setLocalStorage("user", true, data.info)
          setAuthUser(true)
          setLoadingAuthUser(false)
        }
        else {
          setAuthUser(false)
          setLoadingAuthUser(true)
        }
      })
      .catch(function (error) {
        setAuthUser(false)
        setLoadingAuthUser(true)
        toast.error(error.message)
      });
  };


  const changeInfo = (user, callbackFun) => {
    fetchStart();
    const token = localStorage.getItem('token');
    httpClient.defaults.headers.common['Authorization'] = token;
    httpClient
      .post('/change_user_info', user, axiosConfig)
      .then(({ data }) => {

        fetchSuccess();
        if ((data.status) != "0") {
          fetchError(messageChange(data.status));
        } else if ((data.status) == "0") {
          fetchNoti(messageChange(data.status));
          getAuthUser();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          //if (callbackFun) callbackFun();
        } else {
          fetchError(messageSignup(data.status));
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const getAuthUser = () => {
    fetchStart();
    httpClient
      .post('/check_token', axiosConfig)
      .then(({ data }) => {
        if ((data.status) == "0") {
          localStorage.setItem('name', data.user.name);
          localStorage.setItem('email', data.user.email);
          localStorage.setItem('company', data.user.company);
          fetchSuccess();
          setAuthUser(token);
        } else {
          userSignOut();
          fetchError(data.status);
        }
      })
      .catch(function (error) {
        httpClient.defaults.headers.common['Authorization'] = '';
        fetchError(error.message);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    getInfo();
  }, []);

  // Return the user object and auth methods
  return {
    loadingAuthUser,
    isLoading,
    authUser,
    error,
    bypassLogin,
    setError,
    message,
    setMessage,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    getInfo,
    changeInfo,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
