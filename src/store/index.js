import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Cookies from 'js-cookie';
import cookie from 'cookie';

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
const defaultStateBreakpoint = () => {
  return { width: 1200, isMobile: false, breakpoint: 'xl' }
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
  }
}

const ssrLocalStorage = {
  setItem: (key, value) => {
    process.env.SERVER ? void 0 : window.localStorage.setItem(key, value)
  },
  getItem: (key) => {
    return process.env.SERVER ? void 0 : window.localStorage.getItem(key)
  },
  removeItem: (key) => {
    process.env.SERVER ? void 0 : window.localStorage.removeItem(key)
  },
  clear: () => {
    process.env.SERVER ? void 0 : window.localStorage.clear()
  }
}

export default store(function ({ ssrContext }) {
  const keyStorage = 'vuex'
  const persistedState = createPersistedState({
    key: keyStorage,
    storage: {
      getItem: (key) => {
        if (process.env.SERVER) {
          const parsedCookies = cookie.parse(ssrContext.req.headers.cookie ?? '');
          return parsedCookies[key];
        } else {
          return Cookies.get(key);
        }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) => Cookies.set(key, value, { expires: 365 * 10, secure: !process.env.DEV }),
      removeItem: key => Cookies.remove(key),
    }
  })

  const Store = createStore({
    plugins: [persistedState],
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
      breakpoint: {
        state: defaultStateBreakpoint(),
        mutations: {
          BREAKPOINTS: (state, payload) => {
            Object.assign(state, payload)
          },
        },
        actions: {
          setBreakpoints: ({ commit }, payload) => {
            commit('BREAKPOINTS', payload)
          },
        },
        getters: {
          useBreakpoints: (state) => {
            return state
          },
        },
      },

      user: {
        state: defaultStateUser(),
        mutations: {
          RESET_STATE_USER: (state) => {
            Object.assign(state, defaultStateUser())
          },
          USER_AUTH: (state, payload) => {
            Object.assign(state.userAuth, payload)
          },
        },
        actions: {
          resetUser: ({ commit }) => {
            commit('RESET_STATE_USER')
          },
          setUserAuth: (context, payload) => {
            context.commit('USER_AUTH', payload)
          },
        },
        getters: {
          userAuth: (state, getters) => {
            return state.userAuth
          },
          isLoggedIn: (state, getters) => {
            return Boolean(state.userAuth.jwt?.length || 0)
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
