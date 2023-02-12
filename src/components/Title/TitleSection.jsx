import TitleName from "./TitleName";
import { motion } from "framer-motion";

function TitleSection({ titlesNames, titleIndex, updateTitle }) {
  return (
    <motion.div
      className="realtive mx-auto w-full h-14 flex"
      whileHover={"hover"}
      animate={"rest"}
      initial={"rest"}
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
          />
        );
      })}
    </motion.div>
  );
}

export default TitleSection;
