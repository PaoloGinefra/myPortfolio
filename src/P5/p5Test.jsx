import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

let x = 50;
let y = 50;

let width = 500;

function P5Test({ props }) {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, width).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;
    x %= width;
  };

  return <Sketch setup={setup} draw={draw} />;
}
export default P5Test;
