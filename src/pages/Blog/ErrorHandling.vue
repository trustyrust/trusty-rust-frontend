<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Error Handling in Rust</div>
        <div class="text-body1">
          In this post we will go through common ways to handle errors in Rust. This will include best practices and common crates used for
          managing errors such as the <link-href link="https://crates.io/crates/anyhow">anyhow</link-href> crate
          <!-- <link-href link="https://crates.io/crates/thiserror">ThisError</link-href> -->
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Rust Errors</div>
        <highlight-js language="rust" :code="codeEx1" />
        <q-separator class="q-my-lg" />
        <div class="text-body1">
          Lets take the below code as an small example program. Executing the code will prompt you to type your age, then it will print out
          the age you entered.
        </div>
        <div class="text-body1">
          If we input a valid number the code works just fine, but if we input something invalid then the whole thread will panic.
        </div>
        <div class="text-body1 q-pt-md">Input of <text-code>40</text-code> works</div>
        <highlight-js
          language="shell"
          :code="`$ cargo run
What is your Age
40
your age is: 40`"
        />
        <div class="text-body1">Input of <text-code>forty</text-code> panics</div>
        <highlight-js
          language="shell"
          :code="`$ cargo run
What is your Age
fourty
thread 'main' panicked at 'called \`Result::unwrap()\` on an \`Err\` value: ParseIntError { kind: InvalidDigit }', src/main.rs:3:31
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace`"
        />
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Graceful Error Handling</div>
        <div class="text-body1">
          The first to know about error handling in Rust is that all errors should be handled gracefully and never cause a thread panic. The
          best and most idiomatic way to do that in Rust is to return a <text-code>Result</text-code> type for any function that has the
          possibility generating an error. This allows any upstream caller of the function to handle the error as needed.
        </div>
        <div class="text-body1">
          The <text-code>Result</text-code> type in Rust has two possibilities: success <text-code>Ok()</text-code> or failure
          <text-code>Err()</text-code>.
        </div>
        <div class="text-body1">
          In development using <text-code>unwrap</text-code> is fine but in production code it should be replaced with a
          <text-code>Result</text-code> type like the below:
        </div>
        <highlight-js language="rust" :code="codeEx2" />
        <div class="text-body1">
          Now when we run the code if there is an invalid input you the user is prompted to reenter until it is valid
        </div>
        <highlight-js
          language="shell"
          :code="`$ cargo run
What is your Age
fourty
invalid input: invalid digit found in string
please try again
What is your Age
40
your age is: 40`"
        />
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Error Carry with <text-code>?</text-code> Operator</div>
        <div class="text-body1">
          While the above code works it is very cumbersome. Since in Rust there is no native <text-code>try and catch</text-code> syntax we
          use the <text-code>?</text-code> carry operator. This will help clean up the bulk of code created with the match statements. Lets
          rewrite the above example using the <text-code>?</text-code> carry operator.
        </div>
        <highlight-js language="rust" :code="codeEx3" />
        <div class="text-body1">
          In the above example we simplified the actual code down to one <text-code>match</text-code> statement but in doing so we had to
          add a significant amount of boilerplate code to handle the fact that we can only carry over a single error type. This is an issue
          because in <text-code>fn get_valid_age</text-code> we could have a <text-code>io::Error</text-code> on
          <text-code>line 31</text-code> or a <text-code>ParseIntError</text-code> on <text-code>line 32</text-code>. To handle this mixture
          or error types we needed to create a custom struct called <text-code>MyError</text-code> that implemented the From trait for both
          <text-code>io::Error</text-code> and <text-code>ParseIntError</text-code>.
        </div>
        <div class="text-body1">
          From <text-code>line 3</text-code> to <text-code>line 17</text-code> all that code is to simply put two different error types into
          one <text-code>MyError</text-code>. Then finally in <text-code>line 30</text-code> we return our numeric age or our custom error.
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">The Anyhow Crate</div>
        <div class="text-body1">
          Using the <link-href link="https://crates.io/crates/anyhow">anyhow</link-href> crate we can reduce a significant amount of
          boilerplate code for error handling. The <text-code>anyhow</text-code> crate will allow you to use the
          <text-code>?</text-code> carry operator to easily propagate any error that implements the
          <text-code>std::error::Error</text-code> trait. Simply add <text-code>anyhow</text-code> into your
          <text-code>Cargo.toml</text-code> dependencies:
        </div>
        <highlight-js language="ini" :code="codeEx4" />
        <div class="text-body1">Now the above example can be reduced into the following:</div>
        <highlight-js language="rust" :code="codeEx5" />
        <div class="text-subtitle2">
          * Notice on <text-code>line 15</text-code> and <text-code>line 20</text-code> you no longer need to specify any Error type in the
          <text-code>Result</text-code> enum. That is because all Errors carry over with a <text-code>anyhow::Error</text-code> type.
        </div>
        <div class="text-body1 q-mt-md">
          This code is effectively the same as before but significantly less boilerplate. The <text-code>anyhow</text-code> crate is
          generally considered to be best used in application-like code where your priority is to have easy error handling. The downside is
          that you do not get to design your own specific error types. If you need to create custom errors in your code, for example
          library-like code, take a look at the <link-href link="https://crates.io/crates/thiserror">thiserror</link-href> crate.
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">GitHub Source Code</div>
        <div class="text-body1">
          The complete source code for this example can be accessed in GitHub here:
          <link-href link="https://github.com/trustyrust/trusty-rust-examples/tree/master/examples/error_handling"
            >error_handling</link-href
          >
        </div>
      </section>
    </div>
    <table-of-contents />
  </q-page>
</template>

<script>
const codeEx1 = `fn main() {
    let age = get_input("What is your Age");
    let age: u8 = age.parse().unwrap();
    println!("your age is: {}", age);
}

fn get_input(prompt: &str) -> String {
    println!("{}", prompt);
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    input.trim().to_owned()
}
`
const codeEx2 = `fn main() {
    let age: u8 = loop {
        match get_input("What is your Age") {
            Ok(age_input) => match age_input.parse() {
                Ok(n) => break n,
                Err(e) => println!("invalid input: {}\\nplease try again", e),
            },
            Err(e) => println!("invalid input: {}\\nplease try again", e),
        }
    };
    println!("your age is: {}", age);
}

fn get_input(prompt: &str) -> Result<String, std::io::Error> {
    println!("{}", prompt);
    let mut input = String::new();
    match std::io::stdin().read_line(&mut input) {
        Ok(_) => {
            let res: String = input.trim().to_owned();
            Ok(res)
        }
        Err(e) => Err(e),
    }
}`
const codeEx3 = `use std::{io, num::ParseIntError};

struct MyError {
    message: String,
}

impl From<io::Error> for MyError {
    fn from(error: io::Error) -> Self {
        Self { message: error.to_string() }
    }
}

impl From<ParseIntError> for MyError {
    fn from(error: ParseIntError) -> Self {
        Self { message: error.to_string() }
    }
}
fn main() {
    let age: u8 = loop {
        match get_valid_age() {
            Ok(age) => break age,
            Err(e) => {
                println!("invalid input: {}", e.message)
            }
        }
    };
    println!("your age is: {}", age);
}

fn get_valid_age() -> Result<u8, MyError> {
    let s = get_input("What is your Age")?;
    let age: u8 = s.parse()?;
    Ok(age)
}
fn get_input(prompt: &str) -> Result<String, io::Error> {
    println!("{}", prompt);
    let mut input = String::new();
    io::stdin().read_line(&mut input)?;
    let res: String = input.trim().to_owned();
    Ok(res)
}`
const codeEx4 = `[dependencies]
anyhow = "1.0"`
const codeEx5 = `use anyhow::Result;

fn main() {
    let age: u8 = loop {
        match get_valid_age() {
            Ok(age) => break age,
            Err(e) => {
                println!("invalid input: {}", e)
            }
        }
    };
    println!("your age is: {}", age);
}

fn get_valid_age() -> Result<u8> {
    let s = get_input("What is your Age")?;
    let age: u8 = s.parse()?;
    Ok(age)
}
fn get_input(prompt: &str) -> Result<String> {
    println!("{}", prompt);
    let mut input = String::new();
    std::io::stdin().read_line(&mut input)?;
    let res: String = input.trim().to_owned();
    Ok(res)
}`
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
    LinkHref,
    TextCode,
    HighlightJs,
  },
  setup() {
    onMounted(() => {
      // This highlights all code blocks
      addLineNumbersToCodeBlocks(['rust'])
    })
    return {
      codeEx1,
      codeEx2,
      codeEx3,
      codeEx4,
      codeEx5,
    }
  },
}
</script>
