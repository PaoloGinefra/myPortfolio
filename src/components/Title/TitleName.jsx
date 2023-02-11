import { motion } from "framer-motion";

const offset = 250;
const transition = {
  duration: 0.5,
};

const variants = {
  "-1": {
    x: -[offset],
    opacity: 0.5,
    scale: 0.8,
  },
  0: {
    x: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
  1: {
    x: [offset],
    opacity: 0.5,
    scale: 0.8,
  },
  hide1: {
    opacity: 0,
    x: 1.8 * [offset],
    scale: 0,
  },
  "hide-1": {
    opacity: 0,
    x: -1.8 * [offset],
    scale: 0,
  },
  hover: {
    scale: 0.85,
  },
};

const parseDelta = (delta, nTitles) => {
  if (delta > Math.floor(nTitles / 2)) delta -= nTitles;
  else if (delta < -nTitles / 2) delta += nTitles;
  return delta;
};

function TitleName({ title, index, titleIndex, updateTitle, nTitles }) {
  const delta = parseDelta(index - titleIndex, nTitles);
  return (
    <motion.button
      animate={
        Math.abs(delta) <= 1
          ? delta.toString()
          : "hide" + Math.sign(delta).toString()
      }
      onClick={() => updateTitle(delta)}
      className="text-2xl text-center md:text-3xl text-white snap-center"
      whileHover={delta ? "hover" : ""}
      variants={variants}
    >
      {title}
    </motion.button>
  );
}

export default TitleName;
