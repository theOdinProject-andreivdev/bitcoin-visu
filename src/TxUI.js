import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const TxUI = (props) => {
  const [posx, setPosx] = useState(-150);
  const [posy, setPosy] = useState(Math.random() * 100 - 50);
  const [rotx, setRotx] = useState(0);
  const [roty, setRoty] = useState(0);
  const mesh = useRef();

  useFrame(() => {
    //mesh.current.position.y = mesh.current.position.y + randomNumber(-0.1, 0.1);
    if (mesh.current.position.x < 50) {
      mesh.current.position.x =
        mesh.current.position.x + randomNumber(0.2, 0.2);
    } else {
      //  mesh.current.position.x =
      //    mesh.current.position.x + randomNumber(-0.1, 0.1);
    }
  });

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  return (
    <mesh
      ref={mesh}
      position={[posx, posy, 0]}
      rotation={[rotx, roty, 0]}
      scale={[0.5, 0.5, 0.5]}
    >
      <sphereBufferGeometry args={[1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
};

export default TxUI;
