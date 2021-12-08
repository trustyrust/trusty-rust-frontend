import { boot } from 'quasar/wrappers'
import zxcvbn from 'zxcvbn'


// https://github.com/highlightjs/highlight.js/tree/main/src/styles
// https://highlightjs.org/static/demo/
// import 'highlight.js/styles/atom-one-dark-reasonable.css'
// import 'highlight.js/styles/arduino-light.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import rust from 'highlight.js/lib/languages/rust';
import ini from 'highlight.js/lib/languages/ini';
import shell from 'highlight.js/lib/languages/shell';
// import hljsVuePlugin from "@highlightjs/vue-plugin";
import highlightjsLineNumbers from 'highlightjs-line-numbers2.js'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

export default boot(async ({ app, store, router }) => {
    hljs.registerLanguage('shell', shell);
    hljs.registerLanguage('ini', ini);
    hljs.registerLanguage('rust', rust);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('json', json);
    hljs.configure({ ignoreUnescapedHTML: true })
    // hljs.highlightAll()
    // app.use(hljsVuePlugin)

    store.watch(
        (state, getters) => getters.isDarkTheme,
        (val,) => {
            const styleLight = document.getElementById("hljs-light");
            const styleDark = document.getElementById("hljs-dark");
            if (val) {
                styleLight.setAttribute("disabled", "disabled");
                styleDark.removeAttribute("disabled");
            } else {
                styleDark.setAttribute("disabled", "disabled");
                styleLight.removeAttribute("disabled");
            }
        }
    )
})

export const addLineNumbersToCodeBlocks = (langs = []) => {
    // document.querySelectorAll('pre code').forEach((el) => {
    //     hljs.highlightElement(el);
    //   });
    hljs.highlightAll()
    highlightjsLineNumbers.init(hljs)
    if (langs.length === 0) {
        // lineNumber all blocks
        hljs.initLineNumbersOnLoad({ singleLine: true })
    } else {
        // Only lineNumber specific lang code blocks
        for (const lang of langs) {
            const blocks = document.querySelectorAll(`.hljs.language-${lang}`)
            // const blocks = document.querySelectorAll('pre code');
            for (const el of blocks) {
                // console.log(el)
                hljs.lineNumbersBlock(el)
            }
        }
    }
}


export const isValidEmail = (email) => {
    const val = email
    if (!(val && val.length > 0)) {
        return 'Please type something'
    }
    // check valid email
    const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!reEmail.test(val)) {
        return 'Not a Valid Email'
    }
}

export const getPassword = async (val, $q) => {
    return new Promise((resolve, reject) => {
        // check password strength
        const attack = zxcvbn(val)
        if (process.env.DEV) {
            console.log(JSON.stringify(attack, null, 2))
        }
        if (attack.score < 3) {
            $q.dialog({
                // title:'Unlock Wallet',
                seamless: false,
                message: `Your Password is weak.</b><br /><br />Strong passwords avoid using dictionary words and include a combination of letters, numbers, and special charaters`,
                html: true,
                cancel: true,
                persistent: true,
                options: {
                    type: 'toggle',
                    model: [],
                    isValid: (model) => model.includes('isConfirm'),
                    items: [{ label: 'I Do Not Care, Use a Weak Password', value: 'isConfirm' }],
                },
            })
                .onOk(() => {
                    resolve(val)
                })
                .onDismiss(() => {
                    reject({})
                })
        } else {
            resolve(val)
        }
    })
}
