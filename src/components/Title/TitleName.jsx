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

  const y = useTransform(delta, (latest) =>
    parentHovered
      ? 0
      : 18 * (Math.abs(Math.abs(latest)) + (latest > 0 ? -0.5 : 0))
  );

  const scale = useTransform(delta, (latest) =>
    parentHovered ? Math.pow(Math.cos((latest / period) * 2 * Math.PI), 2) : 0.9
  );

  const opacity = parentHovered ? scale : 1;

  const boxShadow = hovered
    ? "0 0px 20px " + color
    : index == titleIndex
    ? "0 0px 20px " + color
    : "0 10px 0px " + color;

  const background_color = parentHovered
    ? "black"
    : index == titleIndex
    ? "black"
    : "rgba(0, 0, 0, 0)";

  const txtColor = parentHovered
    ? "white"
    : index == titleIndex
    ? "white"
    : "rgba(0,0,0,0)";

  const border = parentHovered ? "solid" : "";

  return {
    boxShadow,
    color: txtColor,
    x,
    y,
    scale,
    opacity,
    backgroundColor: background_color,
    border: parentHovered
      ? hovered
        ? "solid 3px " + color
        : "solid 3px white"
      : index == titleIndex
      ? "solid 3px " + color
      : "solid 0px",
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
        className="text-2xl md:text-3xl text-center w-[210px] md:w-[18vw] px-3 pt-1 bg-black rounded-2xl transition duration-500"
        style={getStyle(
          index,
          motionIndex,
          color,
          nTitles,
          isHovered,
          parentHovered,
          titleIndex
        )}
        onMouseEnter={() =>
          titleIndex == motionIndex.get()
            ? setIsHovered(true)
            : setIsHovered(false)
        }
        onMouseLeave={() => setIsHovered(false)}
      >
        {title}
      </motion.div>
    </div>
  );
}

export default TitleName;
