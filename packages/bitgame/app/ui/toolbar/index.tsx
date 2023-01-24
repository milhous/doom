import WidgetQRCode from '@widget/QRCode';

import './index.scss';
import ToolbarAndroid from './assets/toolbar-android.svg';
import ToolbarGoogle from './assets/toolbar-google.svg';
import ToolbarIOS from './assets/toolbar-ios.svg';

// app下载
const AppDownload = (): JSX.Element => {
  return (
    <ul className="ui-toolbar_app">
      <li>
        <ToolbarIOS />
        <AppQRCode />
      </li>
      <li>
        <ToolbarAndroid />
        <AppQRCode />
      </li>
      <li>
        <ToolbarGoogle />
        <AppQRCode />
      </li>
    </ul>
  );
};

// 下载二维码
const AppQRCode = (): JSX.Element => {
  const url = typeof window === 'undefined' ? '' : `${window.location.origin}/app`;

  return (
    <div className="ui-toolbar_QRCode">
      <WidgetQRCode url={url} />
    </div>
  );
};

const UIToolbar = (): JSX.Element => {
  return (
    <div className="ui-toolbar">
      <div className="ui-toolbar_content">
        <article></article>
        <aside>
          <AppDownload />
        </aside>
      </div>
    </div>
  );
};

export default UIToolbar;
