import axiosDefault from 'axios'

const axios = axiosDefault.create({
    baseURL: '/api',
})

axios.interceptors.request.use(config => {
    config.params = {
        ...(config.params || {}),
        jid: new Date().getTime(),
    }
    return config
})

export default axios
