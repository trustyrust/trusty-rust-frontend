<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Solving FizzBuzz in Rust</div>
        <div class="text-body1">
          In this post we will go through all the possible ways to solve the infamous FizzBuzz interview question in Rust. Rust is an
          compiled language like C or Go but unlike most other languages Rust has a lot of unique ways of expressing code. The purpose of
          this tutorial is not merely to solve the FizzBuzz question, but also to learn the different ways to solve using Rust's unique
          style of code construction.
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">FizzBuzz with functions</div>
        <div class="text-body1">The most familiar way to solve FizzBuzz is with functions. It will look something like this:</div>
        <highlight-js language="rust" :code="codeEx1" />
        <div>executing <text-code>cargo run</text-code> will predictable give you the following output:</div>
        <highlight-js
          language="shell"
          code="$ cargo run
fizzbuzz for number 1 is 1
fizzbuzz for number 2 is 2
fizzbuzz for number 3 is fizz
fizzbuzz for number 4 is 4
fizzbuzz for number 5 is buzz
fizzbuzz for number 6 is fizz
fizzbuzz for number 7 is 7
fizzbuzz for number 8 is 8
fizzbuzz for number 9 is fizz
fizzbuzz for number 10 is buzz
fizzbuzz for number 11 is 11
fizzbuzz for number 12 is fizz
fizzbuzz for number 13 is 13
fizzbuzz for number 14 is 14
fizzbuzz for number 15 is fizzbuzz
fizzbuzz for number 16 is 16
fizzbuzz for number 17 is 17
fizzbuzz for number 18 is fizz
fizzbuzz for number 19 is 19
fizzbuzz for number 20 is buzz"
        />
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">FizzBuzz with Matching</div>
        <div class="text-body1">
          Rust has a very powerful Matching syntax. For all the details you can read about it in
          <link-href link="https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html" caption="Chapter 13" />
          of the Rust Book, but what we are interested in now is the ability to match <text-code>and</text-code> logic using the
          <text-code>tuple</text-code> struct. One advantage of this method over the above is that you do not need to declare any
          <text-code>mut</text-code> variables which is best practive for reducing accidential bugs later on. It will look something like
          this:
        </div>
        <highlight-js language="rust" :code="codeEx2" />
        <div class="text-body1">
          If you are not familiar the <text-code>(true, true)</text-code> syntax is simply a tuple struct which means that both the first
          and second items in the tuple must match. The <text-code>_</text-code> underscore signifies to always match. This means Rust will
          go down the match arms from top to bottom and if it is Both Fizz and Buzz it will return <text-code>FizzBuzz</text-code>. If not
          it will go the second arm and check to match on <text-code>is_fizz</text-code> if not it will go to the third arm and check if it
          matches <text-code>is_buzz</text-code> if not it will go to the forth arm which will match on anything (similar to default in a
          case statment) and return the number as a String.
        </div>
        <div class="text-body1">
          This code is both more concise and more clear than the last. We also do not have any <text-code>mut</text-code> variables. Another
          benefit is that built into the Rust compiler is the requirement that all possible matches are handled. This means that if you
          where to forget to add a match arm the compiler will reject your code with <text-code>non-exhaustive patterns</text-code> error.
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section></section>
      <section>
        <div class="text-h4">FizzBuzz as Generic Function</div>
        <div class="text-body1">
          One of the key selling points of Rust to have Zero Cost Abstraction and using Generic Types is one of the ways to achieve this.
          You may have noticed that we defined our <text-code>FizzBuzz</text-code> function we used a <text-code>u32</text-code> type. For
          all practical purposes this would be sufficient but for learning purposes lets define the function using a generic type and call
          it with a <text-code>u128</text-code>
        </div>
        <highlight-js language="rust" :code="codeEx3" />
        <div class="text-body1">Executing produces the following:</div>
        <highlight-js
          language="shell"
          code="$ cargo run
fizzbuzz for number 340282366920938463463374607431768211455 is FizzBuzz
fizzbuzz for number 20 is Buzz
fizzbuzz for number 12345678 is Fizz"
        />
        <div class="text-body1">
          You will notice a fair bit more complexity to this function, so lets break it down. <text-code>i</text-code> is defined as a
          generic type <text-code>T</text-code> in the function definition on line 3. Type <text-code>T</text-code> has two
          <text-code>contraints</text-code> that allow it to be treated like an interger. They are
          <text-code>PrimInt + Unsigned</text-code> on line 5. This means that <text-code>i</text-code> must be an a Primitive Integer and
          Unsigned.
        </div>
        <div class="text-body1">
          A list of PrimInts are
          <text-code>i128, u128, i64, u64, i32, u32, i16, u16, i8, u8, isize, usize</text-code> To see more about these types vist the
          <text-code>num</text-code> crate documentation
          <link-href link="https://docs.rs/num/0.4.0/num/trait.PrimInt.html" caption="PrimInt" />
        </div>
        <div class="text-body1">
          As you can see we also added the <text-code>Unsigned</text-code> contraint to restrict to only those types that are positive.
        </div>
        <div class="text-body1">
          On line 6 we added the <text-code>std::fmt::Display</text-code> contraint so that we can turn the integer back into a String type
          on line 19
        </div>
        <div class="text-body1">
          Now when we run the code we should be able to call this function with any unisgned integer type and Rust will be able to run
          without any additional overhead because Rust guarentees Zero Cost Abstraction
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">FizzBuzz impl From trait</div>
        <highlight-js language="rust" :code="codeEx4" />
        <div class="text-body2 q-pb-md">
          *Note: to reduce complexity you can see in line 12 that we implemented using type <text-code>u32</text-code> rather than defining
          a Genereric Type but the same approach with generics could have been used.
        </div>
        <div class="text-body1">
          The first thing you will notice is that using <text-code>impl</text-code> feels much more like Object Orientied Programming. First
          we define a basic struct that has one private property <text-code>val</text-code>.
        </div>
        <div class="text-body1 q-pt-md">
          In the
          <text-code>impl</text-code> block below the struct from lines 4-11 we define two functions: <text-code>borrow_value</text-code>,
          <text-code>take_value</text-code>. These two functions act like <text-code>getters</text-code>. We have two here for
          demononstration purposes.
          <ul class="q-pt-sm">
            <li>
              <div class="text-body1">
                <text-code>borrow_value</text-code> will return a <text-code>&amp;str</text-code> or a borrowed reference to the
                <text-code>val</text-code> within the struct.
              </div>
            </li>
            <li>
              <div class="text-body1">
                <text-code>take_value</text-code> will return a <text-code>String</text-code>. It will move ownership of the
                <text-code>val</text-code> within the struct into the variable you assigned it. Because of this move in ownership this
                function can only be called one time. Calling it more than once will cause an error from the compiler. See below:
              </div>
              <highlight-js language="rust" :code="codeEx4_sub" />
              <highlight-js language="shell" :code="codeEx4_sub_err" />
            </li>

            <li>
              <div class="text-body1">The <text-code>impl From&lt;u32&gt; for FizzBuzz</text-code> acts like our settor or contructor.</div>
              <div class="text-body1">
                The <text-code>impl</text-code> accepts a <text-code>u32</text-code> and returns a <text-code>FizzBuzz</text-code> struct.
              </div>
            </li>
          </ul>
        </div>
        <div class="text-body1">
          Now in our <text-code>main</text-code> function to turn out integer into our FizzBuzz struct we simply have to call
          <text-code>.into()</text-code> from our <text-code>u32</text-code> or <text-code>FizzBuzz::from(i);</text-code>. Then to get our
          <text-code>String</text-code> result we can call <text-code>borrow_value()</text-code> or <text-code>take_value()</text-code>.
        </div>
        <div class="text-body1">As a one-liner to get FizzBuzz from the integer 30 would look like:</div>
        <highlight-js language="rust" :code="`let result: &str = FizzBuzz::from(30).borrow_value();`" />
        <div class="text-body1">Or</div>
        <highlight-js language="rust" :code="`let result: String = FizzBuzz::from(30).take_value();`" />
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Conclusion</div>
        <div class="text-body1">
          As you see, Rust may be a compiled language but it has a very flexible syntax which can allow you to do write the same code in
          whatever style you are most comfortable with. In other Posts we will go into more of the details of traits and the power of
          implementing those traits to suit your needs. For now enjoy knowing there are many ways to represent the FizzBuzz problem within
          the Rust language. The goal of this Post is to demonstrate some of the nice features of Rust such as an advanced pattern matching
          syntax, generic types, and the impl of a struct.
        </div>
        <div class="text-h4 q-pt-md">GitHub Source Code</div>
        <div class="text-body1">
          The complete source code for this example can be accessed in GitHub here:
          <link-href link="https://github.com/trustyrust/trusty-rust-examples/tree/master/examples/fizz_Buzz">GitHub FizzBuzz</link-href>
        </div>
      </section>
    </div>
    <table-of-contents />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import TextCode from 'src/components/text-code.vue'
import TableOfContents from 'src/components/TableOfContents.vue'
import LinkHref from 'src/components/LinkHref.vue'
import HighlightJs from 'src/components/HighlightJs.vue'
import { addLineNumbersToCodeBlocks } from 'src/boot/preload'

export default defineComponent({
  name: 'BlogFizzBuzz',
  components: {
    TextCode,
    TableOfContents,
    LinkHref,
    HighlightJs,
  },
  methods: {},
  setup() {
    const app = getCurrentInstance()
    const router = useRouter()

    onMounted(() => {
      // This highlights all code blocks
      addLineNumbersToCodeBlocks(['rust'])
    })
    return {
      codeEx1: `pub fn fizz_buzz(i: u32) -> String {
    let mut str = String::new();

    if i % 3 == 0 {
        str += "fizz";
    }
    if i % 5 == 0 {
        str += "buzz";
    }
    if str == "" {
        str = i.to_string();
    }

    str.to_string()
}

fn main() {
    for i in 1..=20 {
        let result = fizz_buzz(i);
        println!("fizzbuzz for number {} is {}", i, result);
    }
}
`,
      codeEx2: `pub fn fizz_buzz(i: u32) -> String {
    let is_fizz = (i % 3) == 0;
    let is_buzz = (i % 5) == 0;

    let result = match (is_fizz, is_buzz) {
        (true, true) => String::from("FizzBuzz"),
        (true, _) => String::from("Fizz"),
        (_, true) => String::from("Buzz"),
        _ => i.to_string(),
    };

    result
}
fn main() {
    for i in 1..=20 {
        let result = fizz_buzz(i);
        println!("fizzbuzz for number {} is {}", i, result);
    }
}`,
      codeEx3: `use num::{PrimInt, Unsigned};

pub fn fizz_buzz<T>(i: T) -> String
where
    T: PrimInt + Unsigned,
    T: std::fmt::Display,
{
    let zero = T::zero();
    // using unwrap because 3 and 5 will never fail being an unsigned int
    let is_fizz = (i % T::from(3).unwrap()) == zero;
    let is_buzz = (i % T::from(5).unwrap()) == zero;

    let result: String = match (is_fizz, is_buzz) {
        (true, true) => "FizzBuzz".to_string(),
        (true, _) => "Fizz".to_string(),
        (_, true) => "Buzz".to_string(),
        _ => {
            // safe to unwrap becasue i is defined as T in the variable definition
            T::from(i).unwrap().to_string()
        }
    };

    result
}
fn main() {
    let x = u128::MAX;
    let result = fizz_buzz(x);
    println!("fizzbuzz for number {} is {}", x, result);

    let y = 20_u64;
    let result = fizz_buzz(y);
    println!("fizzbuzz for number {} is {}", y, result);

    let z = 12345678 as usize;
    let result = fizz_buzz(z);
    println!("fizzbuzz for number {} is {}", z, result);
}
`,
      codeEx4: `pub struct FizzBuzz {
    val: String,
}
impl FizzBuzz {
    pub fn borrow_value(&self) -> &str {
        &self.val
    }
    pub fn take_value(self) -> String {
        self.val
    }
}
impl From<u32> for FizzBuzz {
    fn from(i: u32) -> Self {
        let is_fizz = (i % 3) == 0;
        let is_buzz = (i % 5) == 0;

        let result = match (is_fizz, is_buzz) {
            (true, true) => String::from("FizzBuzz"),
            (true, _) => String::from("Fizz"),
            (_, true) => String::from("Buzz"),
            _ => i.to_string(),
        };

        FizzBuzz { val: result }
    }
}
fn main() {
    for i in 1..=20 {
        // impl of From trait provides this shortcut syntax with into() method
        // or you can call FizzBuzz::from(i);
        let result: FizzBuzz = i.into();

        println!("fizzbuzz for number {} is {}", i, result.borrow_value());
    }
}
`,
      codeEx4_sub: `fn main() {
    let i = 15;
    let result: FizzBuzz = i.into();
    println!("fizzbuzz for number {} is {}", i, result.take_value());
    println!("fizzbuzz for number {} is {}", i, result.take_value()); // <-- error is here. take_value() can only be called once 
}`,
      codeEx4_sub_err: `error[E0382]: use of moved value: "result"
  --> src/main.rs:12:49
   |
10 |     let result: FizzBuzz = i.into();
   |         ------ move occurs because "result" has type "FizzBuzz", which does not implement the "Copy" trait
11 |     println!("fizzbuzz for number {} is {}", i, result.take_value());
   |                                                        ------------ "result" moved due to this method call
12 |     println!("fizzbuzz for number {} is {}", i, result.take_value());
   |                                                 ^^^^^^ value used here after move
   |`,
    }
  },
})
</script>

<style lang="scss" scoped></style>
