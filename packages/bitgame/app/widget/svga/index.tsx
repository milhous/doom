import dynamic from 'next/dynamic';

const WidgetSvga = dynamic(() => import('./WidgetSvga'), {
  ssr: false,
});

export default WidgetSvga;
