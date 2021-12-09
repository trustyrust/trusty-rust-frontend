<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col"></div>

    <!-- https://rustwasm.github.io/docs/wasm-pack/prerequisites/non-rustup-setups.html
https://depth-first.com/articles/2020/06/29/compiling-rust-to-webassembly-a-simple-example/


https://clang.llvm.org/docs/CrossCompilation.html#target-triple
To be clear, wasm32-unknown-unknown does not mean that your system must be 32-bits, instead it means that the wasm runtime must be 32-bits (and currently all wasm runtimes are 32-bits).

There's several flavors of web assembly compilation targets. Since web assembly is a browser tech, it doesn't really have a target platform (that's the first unknown) , and wasm32-unknown-unknown doesn't have any out of box supporting libraries (that's the second unknown).

https://clang.llvm.org/docs/CrossCompilation.html#target-triple

The basic option is to define the target architecture. For that, use -target <triple>. If you don’t specify the target, CPU names won’t match (since Clang assumes the host triple), and the compilation will go ahead, creating code for the host platform, which will break later on when assembling or linking.

The triple has the general format <arch><sub>-<vendor>-<sys>-<abi>, where:
arch = x86_64, i386, arm, thumb, mips, etc.
sub = for ex. on ARM: v5, v6m, v7a, v7m, etc.
vendor = pc, apple, nvidia, ibm, etc.
sys = none, linux, win32, darwin, cuda, etc.
abi = eabi, gnu, android, macho, elf, etc.
The sub-architecture options are available for their own architectures, of course, so “x86v7a” doesn’t make sense. The vendor needs to be specified only if there’s a relevant change, for instance between PC and Apple. Most of the time it can be omitted (and Unknown) will be assumed, which sets the defaults for the specified architecture. The system name is generally the OS (linux, darwin), but could be special like the bare-metal “none”.

When a parameter is not important, it can be omitted, or you can choose unknown and the defaults will be used. If you choose a parameter that Clang doesn’t know, like blerg, it’ll ignore and assume unknown, which is not always desired, so be careful.

Finally, the ABI option is something that will pick default CPU/FPU, define the specific behaviour of your code (PCS, extensions), and also choose the correct library calls, etc. -->

    <!-- content -->
    <table-of-contents />
  </q-page>
</template>

<script>
import { onMounted } from 'vue'
import TextCode from 'src/components/text-code.vue'
import TableOfContents from 'src/components/TableOfContents.vue'
import LinkHref from 'src/components/LinkHref.vue'
import HighlightJs from 'src/components/HighlightJs.vue'
import { addLineNumbersToCodeBlocks } from 'src/boot/preload'

export default {
  components: {
    TableOfContents,
    // TextCode,
    // LinkHref,
    // HighlightJs,
  },
  setup() {
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
    }
  },
}
</script>
