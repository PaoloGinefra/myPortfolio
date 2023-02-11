import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import TitleName from "./TitleName";

function TitleSection({ titlesNames, titleIndex, updateTitle }) {
  return (
    <div className="realtive mx-auto w-full h-14">
      {titlesNames.map((name, index) => {
        return (
          <div
            key={name}
            className="absolute mx-auto left-1/2 -translate-x-1/2"
          >
            <TitleName
              title={name}
              index={index}
              titleIndex={titleIndex}
              updateTitle={updateTitle}
              nTitles={titlesNames.length}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TitleSection;
