/* eslint-disable react-hooks/rules-of-hooks */
import { motion, useTransform } from "framer-motion";
import { useState } from "react";

const parseDelta = (delta, nTitles) => {
  if (delta > Math.floor(nTitles / 2)) delta -= nTitles;
  else if (delta < -nTitles / 2) delta += nTitles;
  return delta;
};

const offset = "50vw";
const period = 15;

const getStyle = (
  index,
  motionIndex,
  color,
  nTitles,
  hovered,
  parentHovered,
  titleIndex
) => {
  const delta = useTransform(motionIndex, (latest) =>
    parseDelta(index - latest, nTitles)
  );

  const xUnscales = useTransform(delta, (latest) =>
    parentHovered ? Math.sin((latest / period) * 2 * Math.PI) : 0
  );

  const x = useTransform(xUnscales, [-1, 1], ["-" + offset, offset]);

  const scale = useTransform(delta, (latest) =>
    parentHovered ? Math.pow(Math.cos((latest / period) * 2 * Math.PI), 2) : 0.9
  );

  const opacity = parentHovered ? scale : index == titleIndex ? 1 : 0;

  const boxShadow = hovered
    ? "0 0px 10px " + color
    : parentHovered
    ? "0 10px 0px " + color
    : "0px 0px 0px" + color;

  return {
    boxShadow,
    color: hovered ? color : "white",
    x,
    scale,
    opacity,
  };
};

function TitleName({
  title,
  index,
  titleIndex,
  updateTitle,
  nTitles,
  color,
  motionIndex,
  parentHovered,
}) {
  const delta = parseDelta(index - titleIndex, nTitles);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`absolute top-0 translate-y-1/2 h-14 left-1/2 -translate-x-1/2 flex justify-center cursor-pointer`}
      style={{ zIndex: 10 - Math.abs(delta) }}
    >
      <motion.div
        onClick={() => updateTitle(delta)}
        className="text-2xl text-center md:text-3xl w-full px-3 bg-black rounded-2xl transition duration-500"
        style={getStyle(
          index,
          motionIndex,
          color,
          nTitles,
          isHovered,
          parentHovered,
          titleIndex
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {title}
      </motion.div>
    </div>
  );
}

export default TitleName;
