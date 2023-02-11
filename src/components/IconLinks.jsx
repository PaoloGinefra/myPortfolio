import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillYoutube,
  AiFillGithub,
} from "react-icons/ai";

function IconLinks() {
  return (
    <div className="text-5xl flex justify-center gap-16 pb-2 text-gray-200 flex-wrap">
      <a
        href="https://github.com/PaoloGinefra"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillGithub />
      </a>
      <a
        href="https://twitter.com/PaoloGinefra"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillTwitterCircle />
      </a>
      <a
        href="https://www.instagram.com/paolo_ginefra/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillInstagram />
      </a>
      <a
        href="https://www.youtube.com/channel/UC9tieCBEaNN8EgO5rXio2Kw"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillYoutube />
      </a>
      <a
        href="https://www.linkedin.com/in/paolo-ginefra/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillLinkedin />
      </a>
    </div>
  );
}

export default IconLinks;
