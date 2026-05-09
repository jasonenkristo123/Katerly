import Image from "next/image";

export default function CompletionStep() {
    return (
        <div className="flex flex-col items-center">
            <Image
                src="/images/checklist-4.svg"
                alt="check"
                width={64}
                height={64}
            />

            <div className="flex-col flex items-center mt-8">
                <h1 className="text-4xl lg:text-4xl font-poppins-600 text-black">
                    Setup selesai!
                </h1>

                <span className="text-md text-graytext-secondary">
                    Katerly sudah siap. Tambah resep pertama Anda atau lihat dashboard.
                </span>
            </div>
        </div>
    );
}