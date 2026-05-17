"use client";
import { motion } from "framer-motion";


interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function FadeIn({ children, delay = 0.5, className = "w-full h-full" }: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>

    )
}