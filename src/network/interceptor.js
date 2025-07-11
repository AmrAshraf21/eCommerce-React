import axios from "axios";

const axiosInter = axios.create({
    baseURL:'https://dummyjson.com'
})

export default axiosInter