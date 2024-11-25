import Loading from '@/components/Loading/Loading';
import React, { Suspense } from 'react';

const withSuspense = (Component: React.FC, fallback: React.ReactNode = <Loading />) => {
  return () => (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};

export default withSuspense;
