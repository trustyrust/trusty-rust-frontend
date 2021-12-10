<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Wasm Advanced</div>
        <div class="text-body1">
          In this post we will create a Rust function that accepts a JavaScript Object as an argument and to returns a JavaScript Object as
          a result. If you haven't already please see the prior post for instructions on how to setup wasm-pack and use
          <blog-link to="/blog/wasm-pack">Rust in NodeJs and the Browser</blog-link>
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Rust Function</div>
        <div class="text-body1">
          In this post we will create a Rust function that accepts a JavaScript Object as an argument and to returns a JavaScript Object as
          a result. If you haven't already please see the prior post for instructions on how to setup wasm-pack and use
          <blog-link to="/blog/wasm-pack">Rust in NodeJs and the Browser</blog-link>
        </div>
        <div class="text-body1">First create a new wasm-pack lib by running:</div>
        <highlight-js language="shell" :code="'$ wasm-pack new wasm-from-rust'" />

        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Cargo.toml</div>
        <div class="text-body1">
          The first thing we need to is to modify the <text-code>Cargo.toml</text-code> file to handle serializing byte structures. Add the
          following dependencies:
        </div>
        <div class="text-caption q-pt-md">
          <text-code :background="false">Cargo.toml</text-code>
        </div>
        <highlight-js language="ini" :code="codeEx2" />
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">structs_js and process_data</div>
        <div class="text-body1">
          In the new project create the following files: <text-code>structs_js.rs</text-code> and <text-code>process_data.rs</text-code>
        </div>
        <highlight-js
          language="shell"
          :code="`$ cd wasm-from-rust
$ touch structs_js.rs
$ touch process_data.rs`"
        />
        <div class="text-body1">
          In <text-code>structs_js.rs</text-code> add the following
          <highlight-js language="rust" :code="codeEx1" />
        </div>
        <div class="text-body1">
          In <text-code>process_data.rs</text-code> add the following
          <highlight-js language="rust" :code="codeEx3" />
        </div>
        <div class="text-body1">
          <text-code>struct JsDataResult</text-code> is how the result will get returned from Rust into JavaScript
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">lib.rs</div>
        <div class="text-body1">In <text-code>lib.rs</text-code> add the following</div>
        <highlight-js language="rust" :code="codeEx4" />
        <div class="text-body1">
          Notice in <text-code>line 14</text-code> we are always returning a <text-code>JsValue</text-code> rather than a
          <text-code>Result</text-code> type. Any errors will also get returned as a JavaScript Object and we will handle them accordingly
          on the JavaScript side below.
        </div>
        <div class="text-body1">
          You can see in <text-code>line 15</text-code> we call the <text-code>process_js_data</text-code> function passing in what we
          received from JavaScript. The <text-code>process_js_data</text-code> function will parse the Object into a Rust struct and then
          perform a calculation from the data and return a <text-code>JsValue</text-code>
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Running Rust code in NodeJs</div>
        <div class="text-body1">In the project run the following to compile into wasm for NodeJs</div>
        <highlight-js language="shell" :code="'$ wasm-pack build --out-dir wasm-nodejs --target nodejs'" />
        <div class="text-body1">Create a new NodeJs project that we will import the above wasm into</div>
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
        <div class="text-body1">In <text-code>index.ts</text-code> add the following</div>
        <highlight-js language="typescript" :code="codeEx5" />
        <div class="text-body1">Now if you run the code it should produce the following</div>
        <highlight-js
          language="shell"
          :code="`$ tsc src/index.ts --outDir lib && node lib/index.js
{ js_num_squared: 144, js_str_rev: 'cba', js_ary_sum: 15 }
missing field \`js_str\` at line 1 column 34
`"
        />
        <div class="text-body1">
          You can see that the first example succeeded and the second failed with an error that we were able to gracefully handle
        </div>

        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">GitHub Source Code</div>
        <div class="text-body1">
          The complete source code for this example can be accessed in GitHub here:
          <link-href link="https://github.com/trustyrust/trusty-rust-examples/tree/master/examples/wasm-pack-advanced"
            >wasm-pack-example</link-href
          >
        </div>
      </section>
    </div>
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
    BlogLink,
    LinkHref,
    HighlightJs,
    TextCode,
  },
  setup() {
    onMounted(() => {
      // This highlights all code blocks
      addLineNumbersToCodeBlocks(['rust'])
    })

    return {
      codeEx1: `use serde::Serialize;
use wasm_bindgen::JsValue;

// This is a simple wrapper for JsValue
// used below to create a custom impl for serde_json::Error
pub struct JsValueWrapper {
    pub js_value: JsValue,
}
// This impl<From> is how we use the ? early return operator
impl From<serde_json::Error> for JsValueWrapper {
    fn from(err: serde_json::Error) -> Self {
        Self {
            js_value: JsValue::from_serde(&JsErrWrapper {
                err: JsErr {
                    message: err.to_string(),
                },
            })
            .unwrap(),
        }
    }
}

// Simple struct to later serialize into to make a Js Error Object
// Follows Node Like naming convention in event of error
/*
  { err: { message: 'err msg' } }
*/
#[derive(Serialize)]
pub struct JsErrWrapper {
    pub err: JsErr,
}
#[derive(Serialize)]
pub struct JsErr {
    pub message: String,
}

// Simple struct to later serialize into to make a Js Error Object
/*
  { data: { ... } }
*/
#[derive(Serialize)]
pub struct JsDataWrapper<T> {
    data: T,
}
impl<T> JsDataWrapper<T> {
    pub fn new(t: T) -> Self {
        Self { data: t }
    }
}
`,
      codeEx3: `use serde::{Deserialize, Serialize};
use wasm_bindgen::JsValue;

use crate::structs_js::{JsDataWrapper, JsValueWrapper};

// This is how data will come from Js
#[derive(Deserialize)]
struct JsData {
    js_num: i32,
    js_str: String,
    js_ary: Vec<i32>,
}

// This is how data will get passes back into Js
#[derive(Serialize)]
struct JsDataResult {
    js_num_squared: u64,
    js_str_rev: String,
    js_ary_sum: i64,
}

pub fn process_js_data(js_val: JsValue) -> Result<JsValue, JsValueWrapper> {
    // Serialize the JsValue object into a Rust JsData struct
    let js_data = js_val.into_serde::<JsData>()?;

    // Create a JsDataResult struct that:
    // * squares the number in js_num
    // * reverses the string in js_str
    // * sums all the values in the js_ary
    let result = JsDataResult {
        js_num_squared: u64::pow(i32::abs(js_data.js_num) as u64, 2),
        js_str_rev: js_data.js_str.chars().rev().collect::<String>(),
        js_ary_sum: js_data.js_ary.into_iter().map(|x| x as i64).sum(),
    };

    // create the object to have a 'data' property with the result above
    let data_wrapper = JsDataWrapper::new(result);

    // serialize the data_wrapper struct into a JsValue to get returned
    let js_result = JsValue::from_serde(&data_wrapper)?;
    Ok(js_result)
}
`,
      codeEx4: `use process_data::process_js_data;
use wasm_bindgen::prelude::*;

mod process_data;
mod structs_js;

// When the 'wee_alloc' feature is enabled, use 'wee_alloc' as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn data_processer(js_val: JsValue) -> JsValue {
    match process_js_data(js_val) {
        Ok(d) => d,
        Err(e) => e.js_value,
    }
}
`,
      codeEx5: `import { data_processer } from "wasm-from-rust";

// function is a an example of how to handle errors from rust wasm
function rustWasmTest(dataForRust: any) {
    const { err, data } = data_processer(dataForRust)
    if (err) throw err
    return data
}


// Example of a successful result
(() => {
    try {
        const dataForRust = {
            js_num: 12,
            js_str: "abc",
            js_ary: [1, 2, 3, 4, 5]
        }
        const data = rustWasmTest(dataForRust)
        console.log(data)
    } catch (error) {
        console.error(error.message)
    }
})();

// Example of a Error begin returned
(() => {
    try {
        // This example will return a error because it is missing js_str
        const dataForRust = {
            js_num: 12,
            js_ary: [1, 2, 3, 4, 5]
        }
        const data = rustWasmTest(dataForRust)
        console.log(data)
    } catch (error) {
        console.error(error.message)
    }
})();
`,
    }
  },
}
</script>
