"use client";

import Skeleton, { SkeletonProps, SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonLoadingProps extends SkeletonProps {
  className?: string;
}

export default function SkeletonLoading({ className, ...props }: SkeletonLoadingProps) {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb" borderRadius="1rem">
      <Skeleton className={className} {...props} />
    </SkeletonTheme>
  );
}
