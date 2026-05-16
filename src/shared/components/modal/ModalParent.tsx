import React from "react";

type ModalParentProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function ModalParent({ isOpen, onClose, children }: ModalParentProps) {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 animate-in fade-in duration-200">
            <div onClick={(e) => e.stopPropagation()} className="bg-white w-[90%] sm:w-[384px] max-h-[90vh] overflow-auto rounded-xl p-6 scale-100 opacity-100 animate-in zoom-in-95 duration-200">
                {children}
            </div>
        </div>
    );
}