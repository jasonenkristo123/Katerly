"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationPageProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
}

export default function PaginationPage({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage
}: PaginationPageProps) {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 10;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl text-sm font-poppins-600 transition-all ${
                        currentPage === i
                            ? "bg-green-primary text-white shadow-md shadow-green-primary/20"
                            : "text-graytext-secondary hover:bg-gray-100 hover:text-green-primary"
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
            <div className="text-sm font-poppins-400 text-graytext-secondary">
                {totalItems !== undefined && itemsPerPage !== undefined ? (
                    <p>
                        Menampilkan <span className="font-poppins-600 text-graytext-primary">
                            {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
                        </span> - <span className="font-poppins-600 text-graytext-primary">
                            {Math.min(currentPage * itemsPerPage, totalItems)}
                        </span> dari <span className="font-poppins-600 text-graytext-primary">{totalItems}</span> data
                    </p>
                ) : (
                    <p>Halaman <span className="font-poppins-600 text-graytext-primary">{currentPage}</span> dari <span className="font-poppins-600 text-graytext-primary">{totalPages}</span></p>
                )}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl border border-gray-200 text-graytext-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-1.5">
                    {renderPageNumbers()}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl border border-gray-200 text-graytext-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}