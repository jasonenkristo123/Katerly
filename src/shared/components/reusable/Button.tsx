import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "custom";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
    className?: string;
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 font-poppins-400 text-[14px]",
    md: "px-9 py-[10px] font-poppins-400 text-[16px] min-w-[134px]",
    lg: "px-12 py-4 font-poppins-400 text-[16px] min-w-[170px] ",
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-green-bold text-white hover:opacity-70 border-2 border-green-bold",
    secondary: "bg-white border-2 text-black hover:opacity-70",
    custom: "text-white border border-white "
}


export default function Button({
    variant = "primary",
    size = "md",
    children,
    className,
    ...props
}: BaseProps & React.ComponentProps<"button">) {
    const baseStyles = 'inline-flex items-center justify-center rounded-[18px] transition-all cursor-pointer duration-300 tracking-wider';

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}