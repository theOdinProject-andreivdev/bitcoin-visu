import React, { useState } from "react";
import { useFrame } from "react-three-fiber";
const BlockUI = (props) => {
  const [posx, setPosx] = useState(props.width * 0.09);
  const [posy, setPosy] = useState(props.number * 20 - 75);
  const [rotx, setRotx] = useState(0);
  const [roty, setRoty] = useState(0);

  useFrame(() => {
    setRotx(rotx + 0.01);
    setRoty(roty + 0.01);
  });

  return (
    <mesh
      position={[posx, posy, 0]}
      rotation={[rotx, roty, 0]}
      scale={[10, 10, 10]}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
};

export default BlockUI;
