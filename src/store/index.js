import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const defaultStateTheme = () => {
  return {
    isDarkTheme: true
  }
}
const defaultStateUser = () => {
  return {
    userAuth: {
      id: null,
      role_id: null,
      user_name: null,
      user_email: null,
      is_email_valid: false,
      created_at: null,
      jwt: null,
    },
    userInfo: {},
  }
}
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      theme: {
        state: defaultStateTheme(),
        mutations: {
          RESET_STATE: (state) => {
            Object.assign(state, defaultStateTheme())
          },
          DARK_THEME: (state, payload) => {
            state.isDarkTheme = payload
          },
        },
        actions: {
          resetState: ({ commit }) => {
            commit('RESET_STATE')
          },
          setDarkTheme: (context, payload) => {
            context.commit('DARK_THEME', payload)
          },
        },
        getters: {
          isDarkTheme: (state) => {
            return state.isDarkTheme
          },
        },
      },


      user: {
        state: defaultStateUser(),
        mutations: {
          RESET_STATE_USER: (state) => {
            Object.assign(state, defaultStateUser())
          },
          USER_INFO: (state, payload) => {
            Object.assign(state.userInfo, payload)
          },
          USER_AUTH: (state, payload) => {
            Object.assign(state.userAuth, payload)
          },
        },
        actions: {
          resetUser: ({ commit }) => {
            commit('RESET_STATE_USER')
          },
          setUserInfo: (context, payload) => {
            context.commit('USER_INFO', payload)
          },
          setUserAuth: (context, payload) => {
            context.commit('USER_AUTH', payload)
          },
        },
        getters: {
          userInfo: (state, getters) => {
            return state.userInfo
          },
          userAuth: (state, getters) => {
            return state.userAuth
          },
        },
      }

    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
