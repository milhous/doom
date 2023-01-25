'use client';

import WidgetQRCode from '@widget/QRCode';

// 下载二维码
const AppQRCode = (): JSX.Element => {
  const url = typeof window === 'undefined' ? '' : `${window.location.origin}/app`;

  return (
    <div className="ui-footer_QRCode">
      <div>
        <WidgetQRCode url={url} />
      </div>
    </div>
  );
};

export default AppQRCode;
