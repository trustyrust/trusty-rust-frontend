<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Use Rust Project in NodeJs and Browser</div>
        <div class="text-body1">
          In this post we will go through how to create a Rust Project, build to <text-code>WASM</text-code>, and run that code in both
          NodeJs and the Browser
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Resource Links</div>
        <div class="text-body1">
          Below are some helpful resources to learn more about wasm-pack and WebAssembly.
          <ul>
            <li><link-href link="https://rustwasm.github.io/docs/wasm-pack">wasm-pack Official Documentation</link-href></li>
            <li><link-href link="https://github.com/rustwasm/wasm-pack">wasm-pack Source Code on GitHub</link-href></li>
            <li><link-href link="https://rustwasm.github.io">wasm-pack Blog Posts</link-href></li>
            <li><link-href link="https://twitter.com/rustwasm">Rust Wasm Twitter Account</link-href></li>
          </ul>
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Install wasm-pack</div>
        <div class="text-body1">
          To begin this tutorial first you must install <text-code>wasm-pack</text-code>, simply run this script in your terminal.
        </div>
        <highlight-js language="shell" :code="'$ curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh'" />
        <div class="text-body1">
          Check if you have <text-code>wasm-pack</text-code> installed correctly by running the follow to print out the version
        </div>
        <highlight-js
          language="shell"
          :code="`$ wasm-pack -V
wasm-pack 0.10.1`"
        />
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Install build target</div>
        <div class="text-body1">
          To compile Rust code into wasm you will need to install the <text-code>wasm32-unknown-unknown</text-code> build target.
        </div>
        <div class="text-body1">To do that simply run the following:</div>
        <highlight-js language="shell" :code="'$ rustup target add wasm32-unknown-unknown'" />
        <div class="text-body1">Check if you have added it correctly run the following it should be listed under installed targets</div>
        <highlight-js
          language="shell"
          :code="`$ rustup show
Default host: x86_64-unknown-linux-gnu

installed targets for active toolchain
--------------------------------------

wasm32-unknown-unknown
x86_64-unknown-linux-gnu

active toolchain
----------------

stable-x86_64-unknown-linux-gnu (default)
rustc 1.57.0 (f1edd0429 2021-11-29)
`"
        />

        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Create Rust Project with wasm-pack</div>
        <div class="text-body1">
          We are going to create a new project called <text-code>wasm-from-rust</text-code> that will have three functions:
          <ul>
            <li><text-code>add_nums</text-code> will take two numbers and add them</li>
            <li><text-code>format_string</text-code> will accept a string argument and return a string</li>
            <li>
              <text-code>data_processer</text-code> will accept an Object as an argument and return a Object
              <div class="text-subtitle2">
                * This will be discussed later in the next Post: <blog-link to="/blog/wasm-pack-advanced">WasmPack Advanced</blog-link>.
              </div>
            </li>
          </ul>
        </div>
        <div class="text-body1">To create the Rust project run</div>
        <highlight-js language="shell" :code="'$ wasm-pack new wasm-from-rust'" />

        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Write functions in Rust</div>
        <div class="text-body1">
          Each function written in Rust that needs to build into wasm needs to be annotated with the
          <text-code>#[wasm_bindgen]</text-code> attribute macro. This macro should be available automatically if using
          <text-code>wasm-pack</text-code> as the <text-code>Cargo.toml</text-code> file will include <text-code>wasm-bindgen</text-code> as
          a dependency.
        </div>
        <div class="text-body1">
          In the <text-code>lib.rs</text-code> file we will create the <text-code>add_nums</text-code> and
          <text-code>format_string</text-code> functions.
        </div>
        <div class="text-caption q-pt-md">
          <text-code :background="false">src/lib.rs</text-code>
        </div>
        <highlight-js language="rust" :code="codeEx1" />

        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Build to wasm</div>
        <div class="text-body1">
          Building to wasm should be as simple as running the following:
          <ul>
            <li>
              Build package for NodeJs:
              <highlight-js language="shell" :code="'$ wasm-pack build --out-dir wasm-nodejs --target nodejs'" />
            </li>
            <li>
              Build package for Web Browser:
              <highlight-js language="shell" :code="'$ wasm-pack build --out-dir wasm-web --target web'" />
            </li>
          </ul>
        </div>
        <div class="text-body1">
          You should now have two folders <text-code>wasm-nodejs</text-code> and <text-code>wasm-web</text-code>.
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Run wasm in NodeJs</div>
        <div class="text-body1">Running wasm code in NodeJs should be simple as installing the package and importing the functions</div>
        <div class="text-body1">Lets create a simple TypeScript project like the following</div>
        <highlight-js
          language="shell"
          :code="`$ mkdir wasm-from-rust-nodejs && cd wasm-from-rust-nodejs
# init the nodejs project with default settings
npm init -y

# create a src folder with index.ts
mkdir src && touch src/index.ts

# install the node dependency
npm i @types/node --save-dev

# path to your output wasm-nodejs directory from Rust
npm i <...>/wasm-nodejs
`"
        />

        <div class="text-body1">Inside of your <text-code>src/index.ts</text-code> file add the following</div>
        <highlight-js language="typescript" :code="codeEx2" />
        <div class="text-body1">Now if you run the code it should produce the following</div>
        <highlight-js
          language="shell"
          :code="`$ tsc src/index.ts --outDir lib && node lib/index.js
add_nums result from wasm: 16
format_string result from wasm: hello wasm test
`"
        />
        <div class="text-body1">
          You are now running Rust code in NodeJs! This is a huge milestone, next we will run wasm from the browser
        </div>

        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Run wasm in Browser</div>
        <div class="text-body1">
          Running wasm code in Browser is a little more complicated. There are three main ways to run wasm code in the Browser:
          <ul>
            <li>With a Bundler like WebPack</li>
            <li>Without a Bundler using Modules</li>
            <li>Without a Bundler without Modules</li>
          </ul>
          In this example we are going to demonstrate the second approach. In an <text-code>html</text-code> file add the following into
          your <text-code>body</text-code> tag
        </div>
        <highlight-js language="html" :code="codeEx3" />
        <div class="text-body1">Now if you open the webpage and check your console you should see:</div>
        <highlight-js
          language="plaintext"
          :code="`add_nums result from wasm: 16
format_string result from wasm: hello wasm test`"
        />
        <div class="text-body1">
          If you wanted to use a Bundler like WebPack to load the wasm here are some helpful links:
          <ul>
            <li>
              <link-href link="https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#bundlers"
                >wasm-bindgen guide</link-href
              >
            </li>
            <li>
              <link-href link="https://github.com/rustwasm/wasm-bindgen/tree/main/examples/hello_world">hello world example</link-href>
            </li>
          </ul>
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">GitHub Source Code</div>
        <div class="text-body1">
          The complete source code for this example can be accessed in GitHub here:
          <link-href link="https://github.com/trustyrust/trusty-rust-examples/tree/master/examples/wasm-pack">wasm-pack-example</link-href>
        </div>
        <div class="text-body1">
          To learn how to pass in Objects as an argument and to return an Object as a result read my next Post
          <blog-link to="/blog/wasm-pack-advanced">WasmPack Advanced</blog-link>
        </div>
      </section>
    </div>

    <!-- 
      https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#bundlers
      https://rustwasm.github.io/docs/wasm-pack/prerequisites/non-rustup-setups.html
https://depth-first.com/articles/2020/06/29/compiling-rust-to-webassembly-a-simple-example/
-->

    <!-- content -->
    <table-of-contents />
  </q-page>
</template>

<script>
import { onMounted } from 'vue'
import TableOfContents from 'src/components/TableOfContents.vue'
import TextCode from 'src/components/text-code.vue'
import LinkHref from 'src/components/LinkHref.vue'
import BlogLink from 'src/components/BlogLink.vue'
import HighlightJs from 'src/components/HighlightJs.vue'
import { addLineNumbersToCodeBlocks } from 'src/boot/preload'

export default {
  components: {
    TableOfContents,
    TextCode,
    LinkHref,
    HighlightJs,
    BlogLink,
  },
  setup() {
    onMounted(() => {
      // This highlights all code blocks
      addLineNumbersToCodeBlocks(['rust'])
    })
    return {
      codeEx1: `use wasm_bindgen::prelude::*;

// When the 'wee_alloc' feature is enabled, use 'wee_alloc' as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn add_nums(num_1: i32, num_2: i32) -> i32 {
    num_1 + num_2
}
#[wasm_bindgen]
pub fn format_string(s: &str) -> String {
    format!("hello {}", s)
}
`,
      codeEx2: `import { add_nums, format_string } from "wasm-from-rust";

(() => {
    const num = add_nums(2, 14)
    console.log('add_nums result from wasm: %d', num)

    const str = format_string("wasm test")
    console.log('format_string result from wasm: %s', str)
})()
`,
      codeEx3: `<body>
     <!-- Note the usage of 'type=module' here as this is an ES6 module -->
     <script type="module">
      import init, { add_nums, format_string } from './wasm-web/wasm_from_rust.js';
      (async() => {
        await init()
        const num = add_nums(2, 14)
        console.log('add_nums result from wasm: %d', num)

        const str = format_string("wasm test")
        console.log('format_string result from wasm: %s', str)
      })()
    <\/script>

    ......

<\/body>`,
    }
  },
}
</script>
