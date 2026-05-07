"use client";

import { ReactSVG } from "react-svg";


type SvgProps = {
    className?: string;
    src: string;
    color?: string;
}

export default function SvgWrapper({
    src,
    className = "w-[22px] h-[22px]",
    color
}: SvgProps) {
    return (
        <ReactSVG src={src} className={`${className} ${color} [&_svg]:w-full [&_svg]:h-full [&_path]:fill-inherit [&_path]:stroke-current `} />
    )
}