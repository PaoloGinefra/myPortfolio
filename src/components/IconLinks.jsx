import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillYoutube,
  AiFillGithub,
} from "react-icons/ai";
import { motion } from "framer-motion";

function Container({ children, url }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.a>
  );
}

function IconLinks() {
  return (
    <div className="text-5xl flex justify-center gap-16 text-gray-200 flex-wrap">
      <Container url="https://github.com/PaoloGinefra">
        <AiFillGithub />
      </Container>

      <Container url="https://twitter.com/PaoloGinefra">
        <AiFillTwitterCircle />
      </Container>

      <Container url="https://www.instagram.com/paolo_ginefra/">
        <AiFillInstagram />
      </Container>

      <Container url="https://www.youtube.com/channel/UC9tieCBEaNN8EgO5rXio2Kw">
        <AiFillYoutube />
      </Container>

      <Container url="https://www.linkedin.com/in/paolo-ginefra/">
        <AiFillLinkedin />
      </Container>
    </div>
  );
}

export default IconLinks;
