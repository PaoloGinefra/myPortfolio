import Image from "next/image"

function Avatar({imageSrc}){
    return (
        <div className='relative lg:w-80 w-[50vw] aspect-square mx-auto bg-gradient-to-b from-[color:var(--primary)] rounded-full mt-20 overflow-hidden'>
            <Image src = {imageSrc} alt='ME'/>
      </div>
    )
}

export default Avatar;