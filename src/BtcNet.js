import axios from "axios";

const BtcNet = () => {
  console.log("conn");
  let ws = new WebSocket("wss://ws.blockchain.info/inv");

  const waitForOpenConnection = () => {
    return new Promise((resolve, reject) => {
      const maxNumberOfAttempts = 100;
      const intervalTime = 100; //ms

      let currentAttempt = 0;
      const interval = setInterval(() => {
        if (currentAttempt > maxNumberOfAttempts - 1) {
          clearInterval(interval);
          reject(new Error("Maximum number of attempts exceeded"));
        } else if (ws.readyState === ws.OPEN) {
          clearInterval(interval);
          resolve();
        }
        currentAttempt++;
      }, intervalTime);
    });
  };

  const subscribeTo = async (val) => {
    if (ws.readyState !== ws.OPEN) {
      try {
        await waitForOpenConnection(ws);
        ws.send(JSON.stringify({ op: val }));
      } catch (err) {
        console.error(err);
      }
    } else {
      ws.send(JSON.stringify({ op: val }));
    }
  };

  const startListen = (onNewTxCallback, onNewBlockCallback) => {
    ws.onmessage = function (evt) {
      let received_msg = JSON.parse(evt.data);
      if (received_msg.op === "utx") {
        onNewTxCallback(received_msg.x.hash);
      }
      if (received_msg.op === "block") {
        onNewBlockCallback(received_msg.x.hash);
      }
    };
  };

  const getTxForBlock = (hash, readyCallback) => {
    axios
      .get("https://blockchain.info/rawblock/" + hash + "?&cors=true")
      .then(function (response) {
        readyCallback(response.data.tx);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };
  return { subscribeTo, startListen, getTxForBlock };
};

export default BtcNet;
