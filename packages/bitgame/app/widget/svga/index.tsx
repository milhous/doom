'use client';

import dynamic from 'next/dynamic';

const Svga = dynamic(() => import('./WidgetSvga'), {
  ssr: false,
});

const WidgetSvga = (props: IWidgetSvgaProps): JSX.Element => {
  return <Svga {...props} />;
};

export default WidgetSvga;
