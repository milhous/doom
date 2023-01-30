// import {show} from './Help';

import './BingoLogo.scss';

// Logo
const BingoLogo = (): JSX.Element => {
  // const handleHelp = (): void => {
  //   show();
  // };

  return (
    <div className="bingo-logo">
      <dl>
        <dt>
          <span>lucky</span>
          {/* <button className="bingo-btn_help" onClick={handleHelp}></button> */}
          <button className="bingo-btn bingo-btn_help">?</button>
        </dt>
        <dd>bingo</dd>
      </dl>
    </div>
  );
};

export default BingoLogo;
