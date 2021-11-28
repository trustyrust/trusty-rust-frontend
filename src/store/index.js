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

const defaultState = () => {
  return {
    isDarkTheme: true
  }
}
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      store: {
        state: defaultState(),
        mutations: {
          RESET_STATE: (state) => {
            Object.assign(state, defaultState())
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
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
