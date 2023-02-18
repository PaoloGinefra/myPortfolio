import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const maxMasses = 4;
let nMasses = Math.floor(Math.random() * (maxMasses - 1)) + 2;
const width = 600;
const padding = 30;
let maxLen = (width - padding) / (2 * nMasses);
const MassRandomRadius = 0.1;

const dt = 0.15;
const g = 3;
const subSemples = 10;

const nTails = 500;

const velNormScale = 0.2;
const normMin = 0.03;
const maxNorm = 8;

const IK_target_lerp = 0.1;

let masses = [Infinity];
let angles = [];
let lengths = [];

let Masses = [];
let Links = [];
let tails = [];

function getScreenPos(pos) {
  return [pos.x + width / 2, pos.y + width / 2];
}

function getWorldPos(screenPos) {
  return [screenPos.x - width / 2, screenPos.y - width / 2];
}

function P5Test({ props }) {
  class Mass {
    constructor(mass, position, velocity) {
      this.mass = mass;
      this.position = position;
      this.prevPosition = position.copy();
      this.velocity = velocity;
      this.radius = (100 * Math.pow(this.mass, 0.5)) / 2;
    }

    draw(p5) {
      const [x, y] = getScreenPos(this.position);
      p5.noFill();
      p5.strokeWeight(5);
      p5.stroke(200);
      p5.circle(x, y, 2 * this.radius);
    }
  }

  class Link {
    constructor(mA, mB, lenght) {
      this.mA = mA;
      this.mB = mB;
      this.lenght = lenght;
    }

    draw(p5) {
      const dir = p5.constructor.Vector.sub(
        this.mA.position,
        this.mB.position
      ).normalize();
      const [x1, y1] = getScreenPos(
        p5.constructor.Vector.add(
          this.mA.position,
          dir.copy().mult(-this.mA.radius)
        )
      );
      const [x2, y2] = getScreenPos(
        p5.constructor.Vector.add(
          this.mB.position,
          dir.copy().mult(this.mB.radius)
        )
      );
      p5.strokeWeight(3);
      p5.stroke(200);
      p5.line(x1, y1, x2, y2);
    }

    applyConstraint(p5, blockB = false) {
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

      const dp_mA = dir
        .copy()
        .mult(correction * (blockB ? 1 : 1 / this.mA.mass / totalW));
      this.mA.position.add(dp_mA);

      const dp_mB = dir
        .copy()
        .mult(-correction * (blockB ? 0 : 1 / this.mB.mass / totalW));
      this.mB.position.add(dp_mB);
    }
  }

  function simulate(p5) {
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
  }

  function isMouseInFrame(p5) {
    return (
      p5.mouseX >= 0 && p5.mouseX < width && p5.mouseY >= 0 && p5.mouseY < width
    );
  }

  function IK(p5) {
    console.log(p5.createVector(p5.mouseX, p5.mouseY));
    const [tx, ty] = getWorldPos(p5.createVector(p5.mouseX, p5.mouseY));
    const target = p5.createVector(tx, ty);

    for (let i = 1; i < Masses.length; i++) {
      Masses[i].prevPosition = Masses[i].position.copy();
    }

    Masses[nMasses].position.lerp(target, IK_target_lerp);
    for (let i = nMasses - 1; i >= 0; i--) {
      Links[i].applyConstraint(p5, true);
    }

    const offset = Masses[0].position.copy();
    for (let i = 0; i <= nMasses; i++) {
      Masses[i].position.sub(offset);
    }

    for (let i = 1; i < Masses.length; i++) {
      Masses[i].velocity = p5.constructor.Vector.sub(
        Masses[i].position,
        Masses[i].prevPosition
      ).mult(subSemples / dt);
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, width).parent(canvasParentRef);

    masses = [Infinity];
    angles = [];
    lengths = [];

    for (let i = 0; i < nMasses; i++) {
      masses.push(Math.random() * MassRandomRadius);
    }

    for (let i = 0; i < nMasses; i++) {
      angles.push(Math.random() * 2 * Math.PI);
    }

    for (let i = 0; i < nMasses; i++) {
      lengths.push(maxLen);
    }

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
  };

  const draw = (p5) => {
    p5.clear();

    if (p5.mouseIsPressed && p5.mouseButton === "left") {
      IK(p5);
      tails = [];
    } else {
      simulate(p5);

      tails.push({
        p1: p5.constructor.Vector.add(
          Masses[Masses.length - 1].position,
          Masses[Masses.length - 1].velocity
            .copy()
            .mult((velNormScale + normMin) / 2)
            .rotate(p5.HALF_PI)
            .limit(maxNorm)
        ),
        p2: p5.constructor.Vector.add(
          Masses[Masses.length - 1].position,
          Masses[Masses.length - 1].velocity
            .copy()
            .mult((velNormScale + normMin) / 2)
            .rotate(-p5.HALF_PI)
            .limit(maxNorm)
        ),
      });

      if (tails.length > nTails) tails.shift();

      p5.noStroke();
      p5.fill(255);
      p5.beginShape();
      for (let i = 0; i < tails.length; i++) {
        const [x1, y1] = getScreenPos(tails[i].p1);
        p5.curveVertex(x1, y1);
      }

      for (let i = tails.length - 1; i >= 0; i--) {
        const [x2, y2] = getScreenPos(tails[i].p2);

        p5.curveVertex(x2, y2);
      }
      p5.endShape();
    }

    Links.forEach((link) => link.draw(p5));
    Masses.forEach((mass) => mass.draw(p5));
  };

  return <Sketch setup={setup} draw={draw} />;
}
export default P5Test;
