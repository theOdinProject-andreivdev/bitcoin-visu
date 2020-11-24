import "./App.css";
import BtcNet from "./BtcNet";
import BlockUI from "./BlockUI";
import { Canvas } from "react-three-fiber";
import React, { useState, useEffect, useRef } from "react";
import TxUI from "./TxUI";
import * as THREE from "three";
import { cleanup } from "@testing-library/react";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [txListInBlocks, setTxListInBlocks] = useState([]);
  const [blocks, setBlocks] = useState([]);
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
    var audio = new Audio(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/bonus.wav"
    );
    audio.play();

    if (blocks.size > 5) setBlocks([]);

    setBlocks([...blocks, { hash }]);
    setTimeout(function () {
      btcnet.getTxForBlock(hash, onBlockTXsReceived);
    }, 3000);
  };

  const onNewTx = (hash) => {
    var audio = new Audio(
      "https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a"
    );
    audio.play();

    let double = false;
    transactions.forEach((tr) => {
      if (tr.hash === hash) {
        double = true;
      }
    });
    if (double === false)
      setTransactions((current) => [...current, { hash: hash, value: 1 }]);
  };

  const onBlockTXsReceived = (txsInBlock) => {
    setTxListInBlocks(txsInBlock);
  };

  useEffect(() => {
    console.log("effect");
    if (txListInBlocks.length === 0) return;
    let tmptxinblocks = 0;
    console.log("transactions");
    console.log(transactions);
    let tmptransaction = transactions.map((t) => Object.assign({}, t));
    console.log("tmp transactions");
    console.log(tmptransaction);
    txListInBlocks.forEach((txInBlock) => {
      tmptransaction.forEach((tx) => {
        if (txInBlock.hash === tx.hash) {
          tx.value = 0;
          tmptxinblocks++;
        }
      });
    });

    console.log("tmp transactions 2");
    console.log(tmptransaction);
    setTxListInBlocks([]);
    setTransactions(tmptransaction);
    setTransactionsInBlocks(transactionsInBlocks + tmptxinblocks);

    setTimeout(function () {
      let tmptransaction = transactions.map((t) => Object.assign({}, t));
      console.log("tmp transactions");
      console.log(tmptransaction);
      for (let i = tmptransaction.length - 1; i >= 0; i--) {
        if (tmptransaction[i].value == 0) {
          tmptransaction.splice(i, 1);
        }
      }

      setTransactions(tmptransaction);
    }, 5000);
  }, [transactions]);

  let blockList = [];

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
            Pending transactions: {transactions.length}
          </div>
          <div className="card-body">
            Transactions in blocks: {transactionsInBlocks}
          </div>
        </div>
        <Canvas className="canvas" camera={{ fov: 50, position: [0, 0, 200] }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          {transactions.map((tr) => {
            return (
              <TxUI
                key={tr.hash}
                value={tr.value}
                width={cnv.offsetWidth}
                height={cnv.offsetHeight}
                geo={geo}
                mat={mat}
              />
            );
          })}

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
