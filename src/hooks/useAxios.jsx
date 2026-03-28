import axios from "axios"

const axiosInstance = axios.create({
    baseURL: `https://parcel-hub-server-hion.vercel.app`
})

const useAxios = () => {
  return axiosInstance;
}

export default useAxios
