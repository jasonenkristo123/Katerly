type Props = {
    children: React.ReactNode;
    footer?: React.ReactNode;
};

export default function StepCard({
    children,
    footer,
}: Props) {
    return (
        <div className="rounded-4xl bg-white p-6 shadow-md lg:p-10">

            {children}

            {footer && (
                <div className="mt-10">
                    {footer}
                </div>
            )}

        </div>
    );
}