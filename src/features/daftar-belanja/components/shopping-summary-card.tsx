interface Props {
  title: string;
  value: string;
  subtitle: string;
}

export default function ShoppingSummaryCard({ title, value, subtitle }: Props) {
  return (
    <div
      className="
                bg-white
                rounded-3xl
                border border-gray-200
                p-6
                shadow-sm
            "
    >
      <p className="text-sm text-graytext-secondary font-poppins-600">
        {title}
      </p>

      <h3 className="text-3xl font-poppins-700 text-black mt-4">{value}</h3>

      <p className="text-sm text-graytext-secondary mt-6">{subtitle}</p>
    </div>
  );
}
