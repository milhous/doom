import Image from 'next/image';

import WidgetLink from '@widget/link';

import Assets from '../assets';

// Logo
const CompLogo = (): JSX.Element => {
  return (
    <WidgetLink to="/">
      <Image
        className="ui-header_logo"
        src={Assets.iconLogo.src}
        alt="Picture of the author"
        width={Assets.iconLogo.width}
        height={Assets.iconLogo.height}
        priority
      />
    </WidgetLink>
  );
};

export default CompLogo;
