import React, { useState } from "react";
import ReactDOM from "react-dom";

import useAnimationFrame from "./useAnimationFrame";
import useInterpolation from "./useInterpolation";

const FpsCounter = () => {
  const [time, setTime] = useState(0);
  // 1s of interpolation time
  const [fps, setFps] = useInterpolation(1000);
  useAnimationFrame(e => {
    setFps(1 / e.delta);
    setTime(e.time);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        color: "white",
        fontSize: "16px",
        zIndex: "9999",
      }}
    >
      {fps && Math.floor(fps.value)} FPS
    </div>
  );
};

export default FpsCounter;
