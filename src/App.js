import "./App.css";

function App() {
  if ("WebSocket" in window) {
    var ws = new WebSocket("wss://ws.blockchain.info/inv");

    ws.onopen = function () {
      ws.send(JSON.stringify({ op: "unconfirmed_sub" }));
      ws.send(JSON.stringify({ op: "blocks_sub" }));
    };

    ws.onmessage = function (evt) {
      const axios = require("axios");
      let received_msg = JSON.parse(evt.data);
      if (received_msg.op === "utx") {
        console.log("utx " + received_msg.x.hash);
      }
      if (received_msg.op === "block") {
        console.log("block " + received_msg.x.hash);
        axios
          .get(
            "https://blockchain.info/rawblock/" +
              received_msg.x.hash +
              "?&cors=true"
          )
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      }
    };

    ws.onclose = function () {
      alert("Connection is closed...");
    };
  } else {
    alert("WebSocket NOT supported by your Browser!");
  }

  return <div className="App"></div>;
}

export default App;
