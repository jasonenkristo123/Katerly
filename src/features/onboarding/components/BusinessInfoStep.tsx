import { OnboardingData } from "../schemas/onboardingSchema";

interface Props {
  data: OnboardingData;
  updateData: (f: Partial<OnboardingData>) => void;
}

export default function BusinessInfoStep({ data, updateData }: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="font-poppins-600 text-4xl text-black">
        Informasi mengenai usaha Anda
      </h1>
      <p className="mt-2 text-gray-500 font-poppins-400">
        Kami sesuaikan Katerly untuk Anda.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <label className="text-lg font-poppins-400">Nama Usaha</label>
        <input
          type="text"
          value={data.namaUsaha}
          onChange={(e) => updateData({ namaUsaha: e.target.value })}
          placeholder="Nama Catering"
          className="rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-green-primary"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <label className="text-lg font-poppins-400">Provinsi</label>
          <input
            type="text"
            value={data.provinsi}
            onChange={(e) => updateData({ provinsi: e.target.value })}
            placeholder="Provinsi"
            className="rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-green-primary"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-lg font-poppins-400">No. WhatsApp</label>
          <input
            type="text"
            value={data.noWhatsapp}
            onChange={(e) => updateData({ noWhatsapp: e.target.value })}
            placeholder="0812-3456-7890"
            className="rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-green-primary"
          />
        </div>
      </div>
    </div>
  );
}
