import path from 'path';
import sizeOf from 'image-size';

import Image from 'next/image';

import {readDirInfo} from '@libs/utils/server';

import CompPartnersAnimation from './CompPartnersAnimation';
import './CompPartners.scss';

const assetsPath = path.resolve(process.cwd(), `./public/assets/footer`);

// 合作商
const CompPartners = async (): Promise<JSX.Element> => {
  const dirInfo = await readDirInfo(assetsPath);
  const imgs = dirInfo.filter(item => item.startsWith('footer-partner'));

  const comps = [];

  for (const img of imgs) {
    const dimensions = sizeOf(`${assetsPath}/${img}`);

    comps.push(
      <li key={img}>
        <Image src={`/assets/footer/${img}`} width={dimensions.width} height={dimensions.height} alt={''} />
      </li>,
    );
  }

  return (
    <div className="ui-footer_partner">
      <CompPartnersAnimation>{comps}</CompPartnersAnimation>
    </div>
  );
};

export default CompPartners;
