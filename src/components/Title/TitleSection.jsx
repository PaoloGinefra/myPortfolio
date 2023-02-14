import TitleName from "./TitleName";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

function TitleSection({ titlesNames, titleIndex, updateTitle, colors }) {
  const motionIndex = useMotionValue(titleIndex);

  useEffect(() => {
    animate(motionIndex, titleIndex, {
      ease: "easeInOut",
      duration: 0.1,
    });
  }, [titleIndex]);

  return (
    <motion.div className="relative group mx-auto h-28 w-full">
      {titlesNames.map((name, index) => {
        return (
          <TitleName
            title={name}
            index={index}
            titleIndex={titleIndex}
            updateTitle={updateTitle}
            nTitles={titlesNames.length}
            key={titlesNames.length * titleIndex + index}
            color={colors[index]}
            motionIndex={motionIndex}
          />
        );
      })}
    </motion.div>
  );
}

export default TitleSection;
