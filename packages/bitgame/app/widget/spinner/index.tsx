import './index.scss';
import SpinnerBg from './spinner-bg.svg';
import SpinnerLogo from './spinner-logo.svg';

// 加载
const WidgetSpinner = (): JSX.Element => {
  return (
    <div className="widget-spinner" style={{opacity: 0}}>
      <div className="widget-spinner_box">
        <SpinnerBg className="widget-spinner_bg" />
        <SpinnerLogo className="widget-spinner_logo" />
      </div>
    </div>
  );
};

export default WidgetSpinner;
