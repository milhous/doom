import Image from 'next/image';

import WidgetLink from '@widget/link';

import logo from '../assets/logo.png';

// Logo
const CompLogo = (): JSX.Element => {
  return (
    <WidgetLink to="/">
      <Image
        className="ui-header_logo"
        src={logo.src}
        alt="Picture of the author"
        width={logo.width}
        height={logo.height}
        priority
      />
    </WidgetLink>
  );
};

export default CompLogo;
