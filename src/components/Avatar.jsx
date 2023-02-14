import Image from "next/image";

function Avatar({ imageSrc }) {
  return (
    <div className="absolute -z-10 opacity-80 left-1/2 -translate-x-1/2 lg:w-80 w-[50vw] aspect-square mx-auto bg-gradient-to-b from-[color:var(--primary)] rounded-full mb-10 overflow-hidden">
      <Image src={imageSrc} alt="ME" />
    </div>
  );
}

export default Avatar;
