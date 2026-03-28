import axios from 'axios'
import React from 'react'
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `https://parcel-hub-server-hion.vercel.app`
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${user.accessToken}` 
    return config;
  }, error =>  {
    return Promise.reject(error);
  })

  axiosSecure.interceptors.response.use(res => {
    return res;
  }, error => {
    console.log('Inside res interceptor', error);
    const status = error.status;
    
    if(status === 403){
      navigate('/forbidden');
    }
    else if (status === 401){
      logout()
      .then(() => {
        navigate('/login');
      })
      .catch(() => { })
    }
  }
)

  return axiosSecure;
}

export default useAxiosSecure
