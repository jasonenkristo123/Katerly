
import SkeletonLoading from '@/shared/components/reusable/SkeletonLoading';

export default function DashboardSkeleton() {
    return (
        <>
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col gap-2">
                        <SkeletonLoading width={100} height={20} />
                        <SkeletonLoading width={140} height={32} className="my-1" />
                        <SkeletonLoading width={60} height={16} />
                    </div>
                ))}
            </div>

            {/* Charts and Lists Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Keuntungan Chart Skeleton */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col h-[400px]">
                    <SkeletonLoading width={200} height={28} className="mb-6" />
                    <div className="flex-1 w-full">
                        <SkeletonLoading className="h-full w-full" />
                    </div>
                </div>

                {/* Menu Terbaru Skeleton */}
                <div className="bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <SkeletonLoading width={140} height={28} />
                        <SkeletonLoading width={20} height={20} circle />
                    </div>
                    <div className="space-y-6">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <SkeletonLoading width={120} height={20} />
                                <SkeletonLoading width={80} height={16} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu Paling Menguntungkan Skeleton */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col h-[400px]">
                    <SkeletonLoading width={250} height={28} className="mb-6" />
                    <div className="flex-1 w-full">
                        <SkeletonLoading className="h-full w-full" />
                    </div>
                </div>

                {/* Nota Terbaru Skeleton */}
                <div className="bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <SkeletonLoading width={140} height={28} />
                        <SkeletonLoading width={80} height={20} />
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="p-4 bg-gray-50/50 rounded-2xl flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <SkeletonLoading width={100} height={20} />
                                    <SkeletonLoading width={140} height={14} />
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <SkeletonLoading width={90} height={20} />
                                    <SkeletonLoading width={50} height={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Action Skeleton */}
            <div className="bg-white p-6 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <SkeletonLoading width={56} height={56} className="rounded-2xl" />
                    <div className="flex flex-col gap-1">
                        <SkeletonLoading width={120} height={28} />
                        <SkeletonLoading width={180} height={20} />
                    </div>
                </div>
                <SkeletonLoading width={32} height={32} circle />
            </div>
        </>
    );
}
