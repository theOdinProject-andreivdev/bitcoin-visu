import "./App.css";
import BtcNet from "./BtcNet";
import BlockUI from "./BlockUI";
import { Canvas } from "react-three-fiber";
import React, { useState, useEffect, useRef } from "react";
import TxUI from "./TxUI";
import * as THREE from "three";

const App = () => {
  const [transactions, setTransactions] = useState(new Map());
  const [blocks, setBlocks] = useState(new Map());
  const [transactionsInBlocks, setTransactionsInBlocks] = useState(0);
  const [btcnet, setBtcNet] = useState();

  const [geo] = useState(new THREE.CircleBufferGeometry(1, 10, 10));
  const [mat] = useState(
    new THREE.MeshBasicMaterial({
      color: "hotpink",
    })
  );

  useEffect(() => {
    setBtcNet(BtcNet());
  }, []);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      init();
    }
  }, [btcnet]);

  const init = () => {
    console.log("Init");
    if ("WebSocket" in window) {
      btcnet.subscribeTo("unconfirmed_sub");
      btcnet.subscribeTo("blocks_sub");

      btcnet.startListen(onNewTx, onNewBlock);
    } else {
      alert("WebSocket NOT supported by your Browser!");
    }
  };

  const onNewBlock = (hash) => {
    const timesReported = blocks.get(hash);
    if (timesReported > 0) {
      setBlocks((prev) => new Map([...prev, [hash, timesReported + 1]]));
      return;
    }

    if (blocks.size > 5) setBlocks(new Map());

    setBlocks((prev) => new Map([...prev, [hash, 1]]));
    setTimeout(function () {
      btcnet.getTxForBlock(hash, onBlockTXsReceived);
    }, 3000);
  };

  const onNewTx = (hash) => {
    const timesReported = transactions.get(hash);
    if (timesReported > 0) {
      setTransactions((prev) => new Map([...prev, [hash, timesReported + 1]]));
      return;
    }
    setTransactions((prev) => new Map([...prev, [hash, 1]]));
  };

  const onBlockTXsReceived = (txsInBlock) => {
    console.log("Size before block: " + transactions.size);
    txsInBlock.forEach((txInBlock) => {
      if (transactions.has(txInBlock.hash)) {
        setTransactions((prev) => new Map([...prev, [txInBlock.hash, 0]]));
        setTransactionsInBlocks(transactionsInBlocks + 1);
      }
    });
    console.log("Size after block: " + transactions.size);
  };

  let txList = [];
  let blockList = [];

  transactions.forEach((transaction) => {
    txList.push(transaction);
  });
  let blockNr = 0;

  blocks.forEach(() => {
    blockList.push(blockNr++);
  });

  var cnv = document.querySelector("canvas");

  return (
    <div className="App">
      <div style={{ display: "grid", height: "100%" }}>
        <div className="card">
          <div className="card-body">
            Pending transactions: {transactions.size}
          </div>
          <div className="card-body">
            Transactions in blocks: {transactionsInBlocks}
          </div>
        </div>
        <Canvas className="canvas" camera={{ fov: 50, position: [0, 0, 200] }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          {txList.map((tx) => (
            <TxUI
              value={tx}
              width={cnv.offsetWidth}
              height={cnv.offsetHeight}
              geo={geo}
              mat={mat}
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
};

export default App;
