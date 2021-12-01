<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Create Rust Project</div>
        <div class="text-body1">In this post we will go through how to create a Rust Project and Debug with vscode</div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Prerequisites</div>
        <div class="text-body1">
          To setup the optimal environment in VsCode for working with Rust code, please install the following extensions:
          <ul>
            <li>
              <link-href link="https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb">CodeLLDB</link-href>
            </li>
            <li>
              <link-href link="https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer">rust-analyzer</link-href> Or
              <link-href link="https://marketplace.visualstudio.com/items?itemName=rust-lang.rust">Rust</link-href>&nbsp;
              <span class="text-body2 q-mt-md">*Note: Install either one but not Both as they will conflict with each other</span>
            </li>
          </ul>
        </div>
        <div class="text-body1">
          Optional Extensions:
          <ul>
            <li>
              <link-href link="https://marketplace.visualstudio.com/items?itemName=serayuzgur.crates">Crates</link-href>
            </li>
            <li>
              <link-href link="https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml">Even Better TOML</link-href>
            </li>
          </ul>
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Setting up in vscode</div>
        <div class="text-body1">First create your project by:</div>
        <highlightjs
          language="shell"
          :autodetect="false"
          :code="`# create the project
$ cargo init my-rust-project

# cd into the directory
$ cd my-rust-project

# open it in vscode
$ code .`"
        />
        <div class="text-body1">
          This will give you a <text-code>Cargo.toml</text-code> file and a <text-code>src</text-code> directory with a
          <text-code>main.rs</text-code> file with a <text-code>fn main()</text-code>. This is the the most basic project setup and can be
          run with:
        </div>
        <highlightjs
          language="shell"
          :autodetect="false"
          :code="`$ cargo run
Hello, world!
`"
        />

        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Setting up tasks.json</div>
        <div class="text-body1">
          To aid in development you are are going to need default build task defined in <text-code>task.json</text-code>. Create a
          <text-code>.vscode/tasks.json</text-code> directory and file if it does not already exist.
        </div>
        <highlightjs
          language="shell"
          :autodetect="false"
          :code="`$ mkdir .vscode
$ touch .vscode/tasks.json
`"
        />
        <div class="text-body1">Inside your <text-code>tasks.json</text-code> file, add the following:</div>
        <highlightjs language="json" :autodetect="false" :code="txtTaskJson" />
        <div class="text-body1">
          Now whenever you Run Default Build Task <text-code>Ctrl + Shift + B</text-code> it will execute
          <text-code>cargo check</text-code>. Cargo Check will not actually build the project but rather check to make sure you do not have
          any syntax errors.
        </div>
        <div class="text-body2 q-mt-md">
          *Note: if you prefer <text-code>cargo build</text-code> change line 6 to <text-code>"command": "build"</text-code><br />It is
          usually preferable to use check rather than build as projects grow build times can get long. Additionally, if need to run the
          code, <text-code>cargo run</text-code> will automatically build the project before running so you are not losing anything.
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Setting up launch.json</div>
        <div class="text-body1">To run and debug code you need to setup a <text-code>launch.json</text-code> file.</div>
        <highlightjs
          language="shell"
          :autodetect="false"
          :code="`$ mkdir .vscode
$ touch .vscode/launch.json
`"
        />
        <div class="text-body1">Inside your <text-code>launch.json</text-code> file, add the following:</div>
        <highlightjs language="json" :autodetect="false" :code="txtLaunchJson" />
        <div class="text-body2 q-mt-md">
          *Note: adjust program in line 8 from <text-code>my-rust-project</text-code> to whatever the program name is defined in your
          <text-code>Cargo.toml</text-code> file.
        </div>

        <div class="text-body1 q-mt-md">
          Now you should be ready for attaching the vscode debugger. First build your project with <text-code>cargo build</text-code> and
          then "Start Debugging" by setting your breakpoints and pressing <text-code>F5</text-code>
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Formatting Code</div>
        <div class="text-body1">
          Something that often gets overlooked is Code Formatting. This small details in code format can make a big difference in
          readability. Luckily vscode extension above has a build in Rust Formatter. It should be picked up by default but it is not, you
          can set it manually in your <text-code>settings.json</text-code> file.
          <ul>
            <li>locally for project specific: <text-code>.vscode/settings.json</text-code></li>
            <li>globally for all projects: <text-code>~/.config/Code/User/settings.json</text-code></li>
          </ul>
        </div>
        <div class="text-body1">Add this to either file</div>
        <highlightjs language="json" :autodetect="false" :code="txtSettingsJson" />
        <div class="text-body1">
          Now you should get nice formatted Rust code every time you press <text-code>Shift + Alt + F</text-code>
        </div>
        <div class="text-body1">
          If you like to adjust the default formatting settings add <text-code>rustfmt.toml</text-code> file to your root project folder and
          you can add configurations just like you would in a <text-code>.prettierrc.json</text-code>
        </div>
        <div class="text-body1">
          All configurations can be found here:
          <link-href to="https://github.com/rust-lang/rustfmt/blob/master/Configurations.md">rustfmt configurations</link-href>
        </div>
        <highlightjs language="shell" :autodetect="false" :code="`touch rustfmt.toml`" />
        <div class="text-body1">
          For Example to adjust the maximum width of each line, simply add to <text-code>rustfmt.toml</text-code>
        </div>
        <highlightjs language="shell" :autodetect="false" :code="`max_width = 200`" />
      </section>
    </div>
    <table-of-contents />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import TextCode from 'src/components/text-code.vue'
import LinkHref from 'src/components/LinkHref.vue'
import TableOfContents from 'src/components/TableOfContents.vue'
import { addLineNumbersToCodeBlocks } from 'src/boot/preload'

export default defineComponent({
  name: 'InstallRust',
  components: {
    TableOfContents,
    TextCode,
    LinkHref,
  },
  methods: {},
  setup() {
    const app = getCurrentInstance()
    const router = useRouter()

    onMounted(() => {
      addLineNumbersToCodeBlocks(['rust', 'json'])
    })
    return {
      txtTaskJson: `{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "cargo",
      "command": "check",
      "problemMatcher": [
        "$rustc"
      ],
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "label": "rust: cargo check"
    }
  ]
}`,
      txtLaunchJson: `{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(gdb) Launch",
      "type": "lldb",
      "request": "launch",
      "program": "\${workspaceFolder}/target/debug/my-rust-project",
      "args": [],
      "stopAtEntry": false,
      "cwd": "\${workspaceFolder}",
      "environment": [],
      "externalConsole": false,
      "MIMode": "gdb",
      "setupCommands": [
        {
          "description": "Enable pretty-printing for gdb",
          "text": "-enable-pretty-printing",
          "ignoreFailures": true
        }
      ]
    }
  ]
}`,
      txtSettingsJson: `"[rust]": {
    "editor.defaultFormatter": "matklad.rust-analyzer",
},`,
    }
  },
})
</script>

<style lang="scss" scoped></style>
