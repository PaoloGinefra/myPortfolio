import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

function TitleName({ title, titleUp, titleDown }) {
  return (
    <div className="flex relative justify-center gap-16 object-center">
      <button onClick={titleDown}>
        <BsFillArrowLeftCircleFill className=" text-white text-3xl" />
      </button>
      <h3 className="text-2xl flex-initial basis-1/4 text-center md:text-3xl text-white">
        {title}
      </h3>

      <button onClick={titleUp}>
        <BsFillArrowRightCircleFill className=" text-white text-3xl" />
      </button>
    </div>
  );
}

export default TitleName;
