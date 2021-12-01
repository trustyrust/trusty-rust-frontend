import { boot } from 'quasar/wrappers'
import axios from 'axios'
import jsend from 'jsend'

// const api = axios.create({ baseURL: 'https://api.example.com' })
// let api

export default boot(({ app, store }) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    const api = axios.create({ baseURL: process.env.BASE_URL })
    // api.defaults.headers.common['Authorization'] = store.getters.userInfo.jwt
    api.defaults.headers.post['Content-Type'] = 'application/json'

    // Add a request interceptor
    api.interceptors.request.use((config) => {
        // Do something before request is sent
        const jwt = store.getters.userAuth.jwt
        if (jwt) {
            config.headers.common['Authorization'] = `Bearer ${jwt}`
        }
        return config
    }, (error) => {
        // Do something with request error
        return Promise.reject(error)
    })

    // Add a response interceptor
    api.interceptors.response.use((response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return jsend.success(response.data)
    }, (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log('status', error.response.status)
        // console.log('status', error.response.status)
        console.log('AXIOS ERROR', JSON.stringify(error.response, null, 2))
        // return Promise.reject(error)
        if (error.response) {
            return Promise.reject(jsend.error({ code: error.response.status, message: error.response.data.message }))
        } else {
            return Promise.reject(jsend.error({ message: error.toString() }))
        }
    })

    app.config.globalProperties.$api = api
})

export { axios }
