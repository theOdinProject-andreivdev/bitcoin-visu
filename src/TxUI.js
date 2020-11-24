import { random } from "lodash";
import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const TxUI = (props) => {
  const [posx, setPosx] = useState(-(props.width * 0.1));
  const [posy, setPosy] = useState(
    Math.random() * (props.height * 0.1) - (props.height * 0.1) / 2
  );
  const [posz, setPosz] = useState(-200);
  const [rotating, setRotating] = useState(false);
  const [rotatingXLimit, setRotatingXLimit] = useState(
    randomNumber(0.035, 0.055)
  );
  const mesh = useRef();

  let t = 0.002;
  useFrame(() => {
    if (mesh.current == null) return;
    if (mesh.current.position.z < 0)
      mesh.current.position.z = mesh.current.position.z + 0.1;
    if (props.value == 0) {
      mesh.current.position.x =
        mesh.current.position.x + randomNumber(0.1, 0.2);
      mesh.current.position.y =
        mesh.current.position.y + randomNumber(0.1, 0.2);

      mesh.current.position.z = mesh.current.position.z + 0.25;
    } else {
      if (mesh.current.position.x > props.width * rotatingXLimit || rotating) {
        setRotating(true);
        let x = mesh.current.position.x;
        let y = mesh.current.position.y;

        mesh.current.position.x = x * Math.cos(t) - y * Math.sin(t);
        mesh.current.position.y = y * Math.cos(t) + x * Math.sin(t);
      }
      if (
        mesh.current.position.x < props.width * rotatingXLimit &&
        rotating === false
      ) {
        mesh.current.position.x = mesh.current.position.x + 0.2;
      }
    }
  });

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  return (
    <mesh
      ref={mesh}
      position={[posx, posy, posz]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
      geometry={props.geo}
      material={props.mat}
    ></mesh>
  );
};

export default TxUI;
