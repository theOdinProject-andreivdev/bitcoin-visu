import "./App.css";
import BtcNet from "./BtcNet";
import BlockUI from "./BlockUI";
import { Canvas } from "react-three-fiber";
import React, { Component } from "react";
import TxUI from "./TxUI";

class App extends Component {
  constructor() {
    super();
    this.transactions = new Map();
    this.transactionsInBlocks = 0;
    this.blocks = new Map();
    this.init();
  }

  init() {
    console.log("Init");
    if ("WebSocket" in window) {
      let btcnet = BtcNet();

      btcnet.subscribeTo("unconfirmed_sub");
      btcnet.subscribeTo("blocks_sub");

      const onNewTx = (hash) => {
        const timesReported = this.transactions.get(hash);
        if (timesReported > 0) this.transactions.set(hash, timesReported + 1);

        this.transactions.set(hash, 1);
        this.forceUpdate();
      };

      const onNewBlock = (hash) => {
        const timesReported = this.blocks.get(hash);
        if (timesReported > 0) this.blocks.set(hash, timesReported + 1);

        if (this.blocks.size > 5) this.blocks.clear();

        this.blocks.set(hash, 1);

        btcnet.getTxForBlock(hash, onBlockTXsReceived);
      };
      const onBlockTXsReceived = (txsInBlock) => {
        console.log("Size before block: " + this.transactions.size);
        txsInBlock.forEach((txInBlock) => {
          if (this.transactions.has(txInBlock.hash)) {
            this.transactions.delete(txInBlock.hash);
            this.transactionsInBlocks++;
          }
        });
        console.log("Size after block: " + this.transactions.size);
      };

      btcnet.startListen(onNewTx, onNewBlock);
    } else {
      alert("WebSocket NOT supported by your Browser!");
    }
  }

  render() {
    let txList = [];
    let blockList = [];
    for (let [key, value] of this.transactions) {
      txList.push(key);
    }
    let blockNr = 0;
    for (let [key, value] of this.blocks) {
      blockList.push(blockNr);
      blockNr++;
    }

    var cnv = document.querySelector("canvas");

    return (
      <div className="App">
        <div style={{ display: "grid", height: "100%" }}>
          <div className="card">
            <div className="card-body">
              Pending transactions: {this.transactions.size}
            </div>
            <div className="card-body">
              Transactions in blocks: {this.transactionsInBlocks}
            </div>
          </div>
          <Canvas
            className="canvas"
            camera={{ fov: 50, position: [0, 0, 200] }}
          >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            {txList.map((tx) => (
              <TxUI
                key={tx}
                width={cnv.offsetWidth}
                height={cnv.offsetHeight}
              />
            ))}

            {blockList.map((blockNr) => (
              <BlockUI
                key={blockNr}
                number={blockNr}
                width={cnv.offsetWidth}
                height={cnv.offsetHeight}
              />
            ))}
          </Canvas>
        </div>
      </div>
    );
  }
}

export default App;
