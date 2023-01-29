import Image from 'next/image';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import {IActivityData} from '@promotions/api';
import Assets from '@promotions/assets';

import './index.scss';

const Detail = async (props: {data: IActivityData}): Promise<JSX.Element> => {
  const {t} = await useTranslate(['promotions'], PackageType.PROMOTIONS);
  const {data} = props;

  return (
    <>
      <div className="promotions-detail_back">
        <div className="promotions-btn_back">
          <Assets.IconArrowGreen />
          <span>{t('return_back')}</span>
        </div>
      </div>
      <dl className="promotions-detail_header">
        <dd>
          <Assets.IconArrowGray />
          <span>{t('return_back')}</span>
        </dd>
        <dt>&nbsp;</dt>
        {/* <dt>{t('promotions')}</dt> */}
      </dl>
      <div className="promotions-detail_banner">
        <Image src={data.img} alt={data.title} width={1178} height={662} />
      </div>
      <div className="promotions-detail_info">
        <h3>{data.title.toLocaleUpperCase()}</h3>
        <p>{data.desc}</p>
      </div>
      <div
        className="promotions-detail_content"
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      ></div>
    </>
  );
};

export default Detail;
