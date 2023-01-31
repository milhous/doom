'use client';

import {Suspense} from 'react';
import dynamic from 'next/dynamic';

const Svga = dynamic(() => import('./WidgetSvga'), {
  ssr: false,
});

const WidgetSvga = (props: IWidgetSvgaProps): JSX.Element => {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Svga {...props} />
    </Suspense>
  );
};

export default WidgetSvga;
