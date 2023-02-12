import { motion } from "framer-motion";

const offset = 60;
const period = 8;

const parseDelta = (delta, nTitles) => {
  if (delta > Math.floor(nTitles / 2)) delta -= nTitles;
  else if (delta < -nTitles / 2) delta += nTitles;
  return delta;
};

const variants = {
  hover: (delta) => ({
    x: (offset * Math.sin((delta / period) * Math.PI)).toString() + "vw",
    scale: Math.pow(Math.cos((delta / period) * Math.PI), 2),
    opacity: Math.pow(Math.cos((delta / period) * Math.PI), 2),
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      opacity: { delay: 0.4, duration: 0.3 * Math.abs(delta) },
      scale: { duration: 0.15 },
      x: { delay: 0.2 * Math.abs(delta), duration: 0.5 },
    },
  }),
  rest: (delta) => ({
    opacity: delta == 0 ? 1 : 0,
    x: 0,
    scale: 0.9,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      opacity: { duration: 0.3 },
      scale: { delay: 0.4, duration: 0.15 },
      x: { duration: 0.5 },
    },
  }),
};

function TitleName({ title, index, titleIndex, updateTitle, nTitles }) {
  const delta = parseDelta(index - titleIndex, nTitles);
  return (
    <div
      className={`absolute m-auto h-14 left-1/2 -translate-x-1/2 flex justify-center cursor-pointer`}
    >
      <motion.button
        custom={delta}
        onClick={() => updateTitle(delta)}
        className="text-2xl text-center md:text-3xl text-white w-full px-3 rounded-2xl border-2 border-[var(--primary)] bg-black"
        variants={variants}
      >
        {title}
      </motion.button>
    </div>
  );
}

export default TitleName;
