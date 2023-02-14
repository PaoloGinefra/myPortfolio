import TitleName from "./TitleName";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

function TitleSection({ titlesNames, titleIndex, updateTitle, colors }) {
  const motionIndex = useMotionValue(titleIndex);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    animate(motionIndex, titleIndex, {
      ease: "easeInOut",
      duration: 0.1,
    });
  }, [titleIndex]);

  return (
    <motion.div
      className="relative group mx-auto h-28 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            parentHovered={isHovered}
          />
        );
      })}
    </motion.div>
  );
}

export default TitleSection;
