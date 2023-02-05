import Image from "next/image"

function Avatar({imageSrc}){
    return (
        <div className='relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-20 overflow-hidden md:h-96 md:w-96'>
            <Image src = {imageSrc} alt='ME'/>
      </div>
    )
}

export default Avatar;