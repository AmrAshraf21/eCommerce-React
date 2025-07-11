import axios from "axios";

import { useContext } from "react";
import { LoadingContext } from "../components/context/LoadingContext/LoadingContext.js";
const axiosInter = axios.create({
    baseURL:'https://dummyjson.com'
})
export const Spinner = ()=>{
    const {showLoading,hideLoading} = useContext(LoadingContext);
    

    axiosInter.interceptors.request.use((config)=>{
        showLoading();
        return config;
    },(error)=>{
        hideLoading();
        return Promise.reject(error);
    });

    axiosInter.interceptors.response.use((res)=>{
        hideLoading();
        return res;
    },error=>{
        hideLoading();
        return Promise.reject(error);
    });
    return axiosInter
}
export default axiosInter