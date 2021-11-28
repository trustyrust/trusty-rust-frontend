import { boot } from 'quasar/wrappers'
import axios from 'axios'


// https://github.com/highlightjs/highlight.js/tree/main/src/styles
// https://highlightjs.org/static/demo/
// import 'highlight.js/styles/atom-one-dark-reasonable.css'
// import 'highlight.js/styles/arduino-light.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import rust from 'highlight.js/lib/languages/rust';
import ini from 'highlight.js/lib/languages/ini';
import shell from 'highlight.js/lib/languages/shell';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import highlightjsLineNumbers from 'highlightjs-line-numbers2.js'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' })
export default boot(async ({ app, store, router }) => {
  hljs.registerLanguage('shell', shell);
  hljs.registerLanguage('ini', ini);
  hljs.registerLanguage('rust', rust);
  hljs.registerLanguage('javascript', javascript);
  hljs.configure({ ignoreUnescapedHTML: true })
  // hljs.highlightAll()

  highlightjsLineNumbers.init(hljs)

  app.use(hljsVuePlugin)


  const styleLight = document.getElementById("hljs-light");
  const styleDark = document.getElementById("hljs-dark");

  // set theme for load
  if (store.getters.isDarkTheme) {
    styleDark.removeAttribute("disabled");
  } else {
    styleLight.removeAttribute("disabled");
  }
  store.watch(
    (state, getters) => getters.isDarkTheme,
    (val,) => {
      if (val) {
        styleLight.setAttribute("disabled", "disabled");
        styleDark.removeAttribute("disabled");
      } else {
        styleDark.setAttribute("disabled", "disabled");
        styleLight.removeAttribute("disabled");
      }
    }
  )

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

const addLineNumbersToCodeBlocks = (langs = []) => {
  if (langs.length === 0) {
    // lineNumber all blocks
    hljs.initLineNumbersOnLoad({ singleLine: true })
  } else {
    // Only lineNumber specific lang code blocks
    for (const lang of langs) {
      const block = document.querySelectorAll(`.hljs.${lang}`)
      for (const el of block) {
        // console.log(el)
        hljs.lineNumbersBlock(el)
      }
    }
  }
}

export { api, addLineNumbersToCodeBlocks }
