import { OnboardingData } from "../schemas/onboardingSchema";

interface Props {
  data: OnboardingData;
  updateData: (f: Partial<OnboardingData>) => void;
}

export default function ProfitMarginStep({ data, updateData }: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="font-poppins-600 text-4xl text-black">
        Pilih target keuntungan Anda
      </h1>
      <p className="mt-2 text-gray-500 font-poppins-400">
        Bisa diubah kapan saja nanti.
      </p>
      <div className="mt-12 flex flex-col">
        <div className="rounded-2xl flex flex-col items-center gap-3 py-4 bg-[#D9F0E4]">
          <span className="text-gray-500 font-poppins-400">Target Margin</span>
          <span className="font-poppins-600 text-5xl text-green-primary">
            {data.marginDefault}%
          </span>
        </div>
        <div className="mt-8">
          <input
            type="range"
            min={0}
            max={100}
            value={data.marginDefault}
            onChange={(e) =>
              updateData({ marginDefault: Number(e.target.value) })
            }
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-green-primary"
          />
        </div>
      </div>
    </div>
  );
}
