import Image from "next/image";

function ToolTag({tool}){
    return(
        <span className="inline-block aspect-square bg-gray-200 outline outline-white rounded-full mr-2 mb-2 overflow-hidden">
            <Image className="w-full" src = {tool.ImgSrc} alt={tool.name} width={20} height={0}/>
        </span>
    );
}

export default ToolTag;