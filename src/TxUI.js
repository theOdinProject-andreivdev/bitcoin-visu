import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const TxUI = (props) => {
  const [posx, setPosx] = useState(-(props.width * 0.1));
  const [posy, setPosy] = useState(
    Math.random() * (props.height * 0.1) - (props.height * 0.1) / 2
  );
  const [rotx, setRotx] = useState(0);
  const [roty, setRoty] = useState(0);
  const mesh = useRef();

  useFrame(() => {
    //this is too resource heavy
    //mesh.current.position.y = mesh.current.position.y + randomNumber(-0.1, 0.1);
    if (props.value == 0) {
      mesh.current.position.x =
        mesh.current.position.x + randomNumber(0.2, 0.2);
      mesh.current.position.y =
        mesh.current.position.y + randomNumber(0.2, 0.2);
    } else {
      if (mesh.current.position.x < props.width * 0.08) {
        mesh.current.position.x =
          mesh.current.position.x + randomNumber(0.2, 0.2);
      } else {
        //this is too resource heavy
        //  mesh.current.position.x =
        //    mesh.current.position.x + randomNumber(-0.1, 0.1);
      }
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
