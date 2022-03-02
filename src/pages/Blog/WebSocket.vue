<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Web Socket in Rust</div>
        <div class="text-body1">
          In this post we will create a web socket server in Rust using the
          <link-href link="https://crates.io/crates/tokio-tungstenite">tokio-tungstenite</link-href> crate, and connect to it using the
          standard
          <link-href link="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#browser_compatibility">WebSocket</link-href> Object
          from the Browser.
          <!-- <link-href link="https://crates.io/crates/thiserror">ThisError</link-href> -->
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Server Side</div>
        <div class="text-body1">First thing you need to do is create a new rust project</div>
        <highlight-js language="shell" :code="`cargo init rust-socket-server`" />
        <div class="text-body1">Add in the dependencies into your <text-code>Cargo.toml</text-code></div>
        <highlight-js language="ini" :code="codeEx1" />
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Folder Structure</div>
        <div class="text-body1">Create a folder structure that looks like</div>
        <highlight-js language="shell" :code="codeEx2" />
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Server Side Logic</div>
        <div class="text-body1">
          For demonstration purposes our websocket will be very simple:
          <ul>
            <li>The program will have a main thread that loops once a second and sends a message to any clients listening</li>
            <li>Another thread to start the tungstenite websocket</li>
            <li>Another thread for each client that is connected</li>
            <li>Another thread to relay the message from the main thread into each client thread via crossbeam_channel</li>
          </ul>
          <div class="text-body1">
            <text-code :background="false">main.rs</text-code>
            <highlight-js language="rust" :code="codeEx3" />
          </div>
          <div class="text-body1">
            <text-code :background="false">mod.rs</text-code>
            <highlight-js language="rust" :code="codeEx4" />
          </div>
          <div class="text-body1">
            <text-code :background="false">ws_subscribe.rs</text-code>
            <highlight-js language="rust" :code="codeEx5" />
          </div>
          <div class="text-body1">
            <text-code :background="false">ws_open_sockets.rs</text-code>
            <highlight-js language="rust" :code="codeEx6" />
          </div>
          <div class="text-body1">
            This gets a little tricky around line 20. This is because we have to separate out incoming and outgoing from/to the client. The
            importance of this is that even though we do not actually read any data from the client in this example we still need to look
            for a closing message with <text-code>msg.is_close()</text-code>. Once the client socket is closed (for example leaving the
            webpage) we need to break the loop and allow our socket channel to hangup. The second possibility is if a client cannot receive
            what we are sending them. One way this can happen is if the client closes in the middle of <text-code>outgoing.send</text-code>.
            It is a subtle difference, but it occurs in the <text-code>outgoing</text-code> half of the split stream so it must be handled
            separately.
          </div>
          <div class="text-body1">
            In line 25 we pin both the <text-code>incoming</text-code> and <text-code>outgoing</text-code> halves of the stream to the stack
            with the <text-code>pin_mut!</text-code> macro so that on line 28 we can block the thread with a
            <text-code>future::select</text-code>. We are using future::select rather than future::join so it will return as soon as either
            half of the stream breaks. Then we hangup the channel by removing the address from the <text-code>Mutex</text-code> and closing
            the thread.
          </div>
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Client Side Logic</div>
        <div class="text-body1">
          On the client side, we just need to create a simple <text-code>html</text-code> file that will connect and print out the message
          it receives. If the connection gets broken it will pause for one second and try to reconnect automatically.
        </div>
        <div class="text-body1 q-pt-md">
          <text-code :background="false">index.html</text-code>
          <highlight-js language="html" :code="codeEx7" />
        </div>
        <q-separator class="q-my-lg" />
        <div class="text-h4">Putting it Together</div>
        <div class="text-body1">
          Run the rust server with <text-code>cargo run</text-code> and you should now have a web socket server listening on
          <text-code>127.0.0.1:34534</text-code>
        </div>
        <div class="text-body1">
          Now open the <text-code>index.html</text-code> file in your browser and it should instantly start to receive messages from the
          rust server
        </div>
        <div class="text-body1">
          <highlight-js language="shell" :code="codeEx8" />
        </div>

        <q-separator class="q-my-lg" />
      </section>
      <div class="text-body1">
        <br />
      </div>
      <section>
        <div class="text-h4">Conclusion</div>
        <div class="text-body1">
          The above is a basic example of how to create a web-socket server in Rust and client in JavaScript. Of course it can get much more
          complex then this including receiving message from the client and handling that appropriately. However, this example is meant to
          keep it simple and basic.
        </div>
        <div class="text-h4 q-pt-md">GitHub Source Code</div>
        <div class="text-body1">
          The complete source code for this example can be accessed in GitHub here:
          <link-href link="https://github.com/trustyrust/trusty-rust-examples/tree/master/examples/web-socket"
            >GitHub rust-web-socket</link-href
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

const codeEx1 = `[dependencies]
anyhow = "1.0.51"
tokio-tungstenite = "0.16.1"
tokio = { version = "1.6.1", features = ["full"] }
futures = "0.3.15"
futures-util = { version = "0.3", default-features = false, features = ["sink"] }
serde_json = "1.0.64"
serde = { version = "1.0.126", features = ["derive"] }
crossbeam-channel = "0.5.1"
`
const codeEx2 = `|-- Cargo.toml
|-- src
|   |-- main.rs
|   |-- web_socket
|       |-- mod.rs
|       |-- ws_open_sockets.rs
|       |-- ws_subscribe.rs
`
const codeEx3 = `use anyhow::Result;
use crossbeam_channel::bounded;
use tokio::time;
use web_socket::WsData;

mod web_socket;

const WEB_SOCKET_ADDR: &'static str = "127.0.0.1:34534";

#[tokio::main]
async fn main() -> Result<()> {
    // open a channel between the main thread and the web socket
    // tx is the transmitter that will be used in the below loop
    // rx is the receiver that will be listening in the web_socket thread
    let (tx, rx) = bounded(1);

    // create a new thread for the web_socket logic and pass in the rx side of the channel
    tokio::spawn(async move {
        web_socket::ws_init(rx, &WEB_SOCKET_ADDR).await.expect("Unable to initialize WebSocket listener");
    });

    // Loop every 1 second and send simple JSON message to any listeners
    let mut count = 1;
    loop {
        let ws_data = WsData {
            count,
            message: format!("message number: {}", count),
        };

        // send WsData across to web_socket thread
        tx.send(ws_data)?;

        // sleep for 1 second
        time::sleep(time::Duration::from_millis(1000)).await;

        // increment the count by one
        count += 1;
    }
}
`
const codeEx4 = `use anyhow::Result;
use crossbeam_channel::{Receiver, Sender};
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use std::{
    collections::HashMap,
    io::Error as IoError,
    net::SocketAddr,
    sync::{Arc, Mutex},
};
use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::tungstenite::Message;

pub mod ws_open_sockets;
pub mod ws_subscribe;

type Tx = Sender<Arc<String>>;
type MapSubscribe = Arc<Mutex<HashMap<SocketAddr, Arc<Tx>>>>;

#[derive(Debug, Serialize, Deserialize)]
pub struct WsData {
    pub count: u64,
    pub message: String,
}

// each web socket subscriber will get their own connection
async fn handle_connection(map: MapSubscribe, raw_stream: TcpStream, addr: SocketAddr) {
    println!("Incoming TCP connection from: {}", addr);

    println!("ws connected: {}", &addr);
    let ws_stream = tokio_tungstenite::accept_async(raw_stream).await.expect("Error during the websocket handshake occurred");
    let (mut outgoing, mut incoming) = ws_stream.split();

    if let Err(e) = ws_open_sockets::on_connection(&mut outgoing, &mut incoming, map, addr).await {
        println!("Error on WebSocket {}: {}", addr, e);
        // Send error message to client
        outgoing.send(Message::Text(format!("Error: {}", e))).await.expect("Failed to close");
        // Close the websocket
        outgoing.close().await.expect("Failed to close");
    };
}

pub async fn ws_init(rx: Receiver<WsData>, addr: &str) -> Result<(), IoError> {
    // Create a new state to represent each connection in a HashMap
    let state = MapSubscribe::new(Mutex::new(HashMap::new()));

    // Create the event loop and TCP listener we'll accept connections on
    // Panic program if this fails
    let listener = TcpListener::bind(addr).await.expect("Failed to bind");
    println!("Web Socket listening on: {}", addr);

    // spawn new thread that will receive the WsData message from the main thread every second
    tokio::spawn(ws_subscribe::subs(rx, Arc::clone(&state)));

    // spawn new thread each time a client connects
    while let Ok((stream, addr)) = listener.accept().await {
        tokio::spawn(handle_connection(Arc::clone(&state), stream, addr));
    }

    Ok(())
}`

const codeEx5 = `use anyhow::Result;
use crossbeam_channel::Receiver;
use std::sync::Arc;

use super::{MapSubscribe, WsData};

pub fn subs_logic(rx: &Receiver<WsData>, map_subs: &MapSubscribe) -> Result<()> {
    // wait for the next rx and pass message along to each listener
    let msg = rx.recv()?;

    // convert struct into JSON and wrap into an Arc to pass
    let data_owner = Arc::new(serde_json::to_string(&msg)?);

    // iter through the map and send a Arc clone of the JSON string above into the on_connection loop
    let map = map_subs.lock().unwrap();
    let (_success, errors): (Vec<_>, Vec<_>) = map.iter().map(|(_, tx)| tx.send(Arc::clone(&data_owner))).partition(Result::is_ok);

    // if any errors print them and do nothing else
    errors.into_iter().for_each(|e| println!("unable to send ws msg: {}", e.unwrap_err()));
    Ok(())
}
pub async fn subs(rx: Receiver<WsData>, map_subs: MapSubscribe) {
    loop {
        if let Err(e) = subs_logic(&rx, &map_subs) {
            println!("Error sending ws data to subscribers: {}", e);
            break;
        }
    }
}`

const codeEx6 = `use super::MapSubscribe;

use anyhow::Result;
use crossbeam_channel::{bounded, Receiver};
use futures::{
    future, pin_mut,
    stream::{SplitSink, SplitStream},
    StreamExt,
};
use futures_util::SinkExt;
use std::{net::SocketAddr, sync::Arc};
use tokio::net::TcpStream;
use tokio_tungstenite::{tungstenite::Message, WebSocketStream};

pub async fn on_connection(outgoing: &mut SplitSink<WebSocketStream<TcpStream>, Message>, incoming: &mut SplitStream<WebSocketStream<TcpStream>>, map: MapSubscribe, addr: SocketAddr) -> Result<()> {
    // created the crossbeam channel to communicate with subs_logic
    let (tx, rx) = bounded(1);
    map.lock().unwrap().insert(addr, Arc::new(tx));

    // blocking for all future subscriptions
    let r = read_client_connected(incoming);
    let s = send_msg(rx, outgoing);

    // This pins r and s to the stack to do the future::select
    pin_mut!(r, s);
    // whichever future returns first, (r) client disconnects or (s) sending fails because client is unavailable
    // should most of the time be (r) first but it happens that a client becomes unavailable in middle of transmission
    future::select(r, s).await;

    // hangup the channel
    map.lock().unwrap().remove(&addr);
    println!("ws disconnected: {} -> open connections: {}", &addr, Arc::strong_count(&map) - 3);
    Ok(())
}

async fn send_msg(rx: Receiver<Arc<String>>, outgoing: &mut SplitSink<WebSocketStream<TcpStream>, Message>) {
    loop {
        match rx.recv() {
            Ok(msg_json) => {
                // send the message to the client
                match &outgoing.send(Message::Text(msg_json.to_string())).await {
                    Ok(_) => {}
                    Err(e) => {
                        println!("err from rx.recv will now close connection: {}", e);
                        break;
                    }
                }
            }
            Err(e) => {
                println!("{}", e)
            }
        }
    }
}

async fn read_client_connected(incoming: &mut SplitStream<WebSocketStream<TcpStream>>) {
    // As long as the client is connect incoming will be able to await on next.
    loop {
        let msg = incoming.next().await;
        match msg {
            Some(msg) => match msg {
                Ok(msg) => {
                    // Only care about close messages. All other messages will be ignored
                    if msg.is_close() {
                        println!("{}", "client disconnected, close socket gracefully");
                        break;
                    }
                }
                Err(e) => {
                    println!("error on read_client_connected: {}", e);
                    break;
                }
            },
            None => {
                println!("{}", "read_client_connected received None");
                break;
            }
        }
    }
}
`
const codeEx7 = [
  '<html>',
  '<script>',
  '    const WEB_SOCKET_URL = "ws://127.0.0.1:34534"',
  '',
  '    const ws_listen = () => {',
  '        const ws = new WebSocket(WEB_SOCKET_URL);',
  '        ws.onclose = (event) => {',
  '            console.log("close Reconnect will be attempted in 1 second.", { code: event.code, reason: event.reason });',
  '            setTimeout(() => {',
  '                ws_listen();',
  '            }, 1000);',
  '        };',
  '        ws.onerror = (err) => {',
  '            console.error("Socket encountered error: ", err.message, "Closing socket");',
  '            ws.close();',
  '        };',
  '        ws.onopen = () => {',
  '            console.log("WebSocket Connected:");',
  '        };',
  '        ws.onmessage = (ev) => {',
  '            console.log(ev.data);',
  '            const ul = document.getElementById("list")',
  '            const li = document.createElement("li");',
  '            li.appendChild(document.createTextNode(ev.data));',
  '            ul.appendChild(li);',
  '        };',
  '    }',
  '    ws_listen()',
  '<\/script>',
  '<body>',
  '    <ul id="list">',
  '        <!-- the messages will be added as a li here -->',
  '    </ul>',
  '</body>',
  '</html>',
].join('\n')
const codeEx8 = `{"count":2,"message":"message number: 2"}
{"count":3,"message":"message number: 3"}
{"count":4,"message":"message number: 4"}
{"count":5,"message":"message number: 5"}`
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
      codeEx6,
      codeEx7,
      codeEx8,
    }
  },
}
</script>
