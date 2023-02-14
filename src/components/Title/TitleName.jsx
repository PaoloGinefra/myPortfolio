/* eslint-disable react-hooks/rules-of-hooks */
import { motion, useTransform } from "framer-motion";

const parseDelta = (delta, nTitles) => {
  if (delta > Math.floor(nTitles / 2)) delta -= nTitles;
  else if (delta < -nTitles / 2) delta += nTitles;
  return delta;
};

const offset = "50vw";
const period = 15;

const getStyle = (index, motionIndex, color, nTitles) => {
  const delta = useTransform(motionIndex, (latest) =>
    parseDelta(index - latest, nTitles)
  );

  const xUnscales = useTransform(delta, (latest) =>
    Math.sin((latest / period) * 2 * Math.PI)
  );

  const x = useTransform(xUnscales, [-1, 1], ["-" + offset, offset]);

  const scale = useTransform(delta, (latest) =>
    Math.pow(Math.cos((latest / period) * 2 * Math.PI), 2)
  );

  return {
    boxShadow: "0 10px 20px " + color,
    x,
    scale,
    opacity: scale,
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
}) {
  const delta = parseDelta(index - titleIndex, nTitles);
  return (
    <div
      className={`absolute top-0 translate-y-1/2 h-14 left-1/2 -translate-x-1/2 flex justify-center cursor-pointer`}
      style={{ zIndex: 10 - Math.abs(delta) }}
    >
      <motion.div
        onClick={() => updateTitle(delta)}
        className="text-2xl text-center shadow-xl md:text-3xl text-white w-full px-3 bg-black rounded-2xl border-0 border-[var(--primary)] hover:border-0 hover:text-[var(--primary)] hover:shadow-sm transition duration-500"
        style={getStyle(index, motionIndex, color, nTitles)}
      >
        {title}
      </motion.div>
    </div>
  );
}

export default TitleName;
