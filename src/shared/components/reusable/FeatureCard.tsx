import SvgWrapper from "./SvgWrapper";


type FeatureCardProps = {
    iconImage: string;
    title: string;
    desc: string;
    colorBg?: string;
    colorSvg?: string;
    className?: string;
}

export default function FeatureCard({ iconImage, title, desc, colorBg, colorSvg, className }: FeatureCardProps) {

    return (
        <div className="flex flex-col px-7 py-6 rounded-2xl shadow-xl space-y-3 w-full h-full bg-white border border-gray-50">
            <div className={`rounded-full w-12 h-12 ${colorBg} flex items-center justify-center z-10 shrink-0`}>
                <SvgWrapper src={iconImage} color={colorSvg} className={`${className}`} />
            </div>
            <h1 className="font-poppins-600 text-xl md:text-2xl text-black">
                {title}
            </h1>
            <p className="font-poppins-400 text-graytext-secondary text-sm md:text-base leading-relaxed">
                {desc}
            </p>
        </div>
    )

}