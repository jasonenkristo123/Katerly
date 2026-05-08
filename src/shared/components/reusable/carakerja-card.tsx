

type caraKerjaCard = {
    numberTitle: string;
    title: string;
    desc: string;
}


export default function CaraKerjaCard({
    numberTitle,
    title,
    desc
}: caraKerjaCard) {
    return (
        <div className="rounded-3xl bg-white px-8 py-10 flex flex-col space-y-5 shadow-xl border border-gray-100 w-full lg:max-w-[420px] h-full transform transition-transform hover:scale-[1.02] flex-grow">
            <h2 className="text-green-primary/40 text-5xl md:text-6xl lg:text-7xl font-poppins-600 leading-none">
                {numberTitle}
            </h2>
            <div className="flex flex-col space-y-3 flex-grow">
                <h3 className="font-poppins-600 text-xl md:text-2xl text-black">
                    {title}
                </h3>
                <p className="text-graytext-secondary font-poppins-400 text-sm md:text-base leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
    )
}