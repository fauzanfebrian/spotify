import axiosDefault from 'axios'

const axios = axiosDefault.create({
    baseURL: '/api',
})

export default axios
