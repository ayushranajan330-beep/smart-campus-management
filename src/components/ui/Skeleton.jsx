import React from 'react';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800 ${className}`}
      {...props}
    />
  );
};

export default Skeleton;

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl space-y-6 border border-slate-100 dark:border-slate-800">
    <div className="flex justify-between items-start">
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <Skeleton className="w-24 h-6 rounded-full" />
    </div>
    <div className="space-y-3">
      <Skeleton className="w-3/4 h-8" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-5/6 h-4" />
    </div>
    <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between">
      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-24 h-4" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-4">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex items-center gap-6 p-4">
        <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-1/3 h-5" />
          <Skeleton className="w-1/4 h-3" />
        </div>
        <Skeleton className="w-24 h-8 rounded-xl" />
        <Skeleton className="w-10 h-10 rounded-xl" />
      </div>
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="h-64 flex items-end gap-4 px-4">
    {[...Array(6)].map((_, i) => (
      <Skeleton 
        key={i} 
        className="flex-1" 
        style={{ height: `${Math.random() * 80 + 20}%` }} 
      />
    ))}
  </div>
);

export const DashboardSkeleton = () => (
  <div className="p-8 space-y-10">
    <Skeleton className="h-48 w-full rounded-[3rem]" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-2xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <TableSkeleton rows={6} />
      </div>
      <Skeleton className="h-full min-h-[400px] rounded-[2.5rem]" />
    </div>
  </div>
);
