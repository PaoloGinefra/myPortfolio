import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

let x = 50;
let y = 50;

let width = 500;

const lengths = [70, 70, 70];
const masses = [
  Infinity,
  Math.random() * 0.1,
  Math.random() * 0.1,
  Math.random() * 0.1,
];
const angles = [
  Math.random() * Math.PI * 2,
  Math.random() * Math.PI * 2,
  Math.random() * Math.PI * 2,
];

const dt = 0.1;
const g = 3;
const subSemples = 5;

const nTails = 500;

function getScreenPos(pos) {
  return [pos.x + width / 2, pos.y + width / 2];
}

function P5Test({ props }) {
  class Mass {
    constructor(mass, position, velocity) {
      this.mass = mass;
      this.position = position;
      this.prevPosition = position.copy();
      this.velocity = velocity;
    }

    draw(p5) {
      const [x, y] = getScreenPos(this.position);
      p5.circle(x, y, 100 * Math.pow(this.mass, 0.5));
    }
  }

  class Link {
    constructor(mA, mB, lenght) {
      this.mA = mA;
      this.mB = mB;
      this.lenght = lenght;
    }

    draw(p5) {
      const [x1, y1] = getScreenPos(this.mA.position);
      const [x2, y2] = getScreenPos(this.mB.position);
      p5.line(x1, y1, x2, y2);
    }

    applyConstraint(p5) {
      const totalW = 1 / this.mA.mass + 1 / this.mB.mass;
      const dist = p5.constructor.Vector.sub(
        this.mA.position,
        this.mB.position
      ).mag();
      const dir = p5.constructor.Vector.sub(
        this.mA.position,
        this.mB.position
      ).normalize();
      const correction = this.lenght - dist;

      const dp_mA = dir.copy().mult(correction / this.mA.mass / totalW);
      this.mA.position.add(dp_mA);

      const dp_mB = dir.copy().mult(-correction / this.mB.mass / totalW);
      this.mB.position.add(dp_mB);
    }
  }

  let Masses = [];
  let Links = [];

  let tails = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, width).parent(canvasParentRef);

    Masses = [];
    Links = [];
    tails = [];

    let pos = p5.createVector(0, 0);
    for (let i = 0; i < masses.length; i++) {
      Masses.push(new Mass(masses[i], pos.copy(), p5.createVector(0, 0)));
      pos.add(p5.createVector(lengths[i], 0).setHeading(angles[i]));
    }

    for (let i = 0; i < lengths.length; i++) {
      Links.push(new Link(Masses[i], Masses[i + 1], lengths[i]));
    }

    console.log(Masses);
    console.log(Links);
  };

  const draw = (p5) => {
    p5.clear();

    p5.stroke(255);

    for (let sample = 0; sample < subSemples; sample++) {
      for (let i = 1; i < Masses.length; i++) {
        Masses[i].velocity.add(p5.createVector(0, (g * dt) / subSemples));
        Masses[i].prevPosition = Masses[i].position.copy();
        Masses[i].position.add(Masses[i].velocity.mult(dt / subSemples));
      }

      for (let i = 0; i < Links.length; i++) {
        Links[i].applyConstraint(p5);
      }

      for (let i = 1; i < Masses.length; i++) {
        Masses[i].velocity = p5.constructor.Vector.sub(
          Masses[i].position,
          Masses[i].prevPosition
        ).mult(subSemples / dt);
      }
    }

    tails.push(Masses[Masses.length - 1].position.copy());

    if (tails.length > nTails) tails.shift();

    Links.forEach((link) => link.draw(p5));
    Masses.forEach((mass) => mass.draw(p5));

    p5.noFill();
    p5.beginShape();
    for (let i = 0; i < tails.length; i++) {
      const [x, y] = getScreenPos(tails[i]);
      p5.vertex(x, y);
    }
    p5.endShape();
  };

  return <Sketch setup={setup} draw={draw} />;
}
export default P5Test;
