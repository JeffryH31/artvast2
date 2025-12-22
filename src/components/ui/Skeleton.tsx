import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-xl',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`bg-gray-200 ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
}

// Skeleton Presets
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <Skeleton variant="rounded" className="w-full aspect-square mb-4" />
      <Skeleton variant="text" className="h-6 w-3/4 mb-2" />
      <Skeleton variant="text" className="h-4 w-full mb-2" />
      <Skeleton variant="text" className="h-4 w-2/3 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="h-8 w-24" />
        <Skeleton variant="rounded" className="h-10 w-32" />
      </div>
    </div>
  );
}

export function SkeletonProduct() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
      <Skeleton variant="rectangular" className="w-full aspect-square" />
      <div className="p-4">
        <Skeleton variant="text" className="h-5 w-3/4 mb-2" />
        <Skeleton variant="text" className="h-4 w-full mb-3" />
        <div className="flex items-center justify-between">
          <Skeleton variant="text" className="h-6 w-20" />
          <Skeleton variant="text" className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-xl mb-3">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1">
            <Skeleton variant="text" className="h-5 w-3/4 mb-2" />
            <Skeleton variant="text" className="h-4 w-1/2" />
          </div>
          <Skeleton variant="rounded" width={80} height={32} />
        </div>
      ))}
    </>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow">
      {/* Header */}
      <div className="grid gap-4 p-4 border-b border-gray-200" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} variant="text" className="h-5" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4 p-4 border-b border-gray-100" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} variant="text" className="h-4" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 48 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}
