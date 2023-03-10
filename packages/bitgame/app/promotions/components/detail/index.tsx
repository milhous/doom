import Image from 'next/image';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';
import WidgetLink from '@widget/link';

import {IActivityData} from '@promotions/api';
import Assets from '@promotions/assets';

import './index.scss';

const Detail = (props: {data: IActivityData}): JSX.Element => {
  const {t} = useTranslate(['promotions'], PackageType.PROMOTIONS);
  const {data} = props;

  return (
    <>
      <div className="promotions-detail_back">
        <WidgetLink to="/promotions" classname="promotions-btn_back">
          <Assets.IconArrowGreen />
          <span>{t('return_back')}</span>
        </WidgetLink>
      </div>
      <dl className="promotions-detail_header">
        <dd>
          <WidgetLink to="/promotions">
            <Assets.IconArrowGray />
            <span>{t('return_back')}</span>
          </WidgetLink>
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
