import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import './CompCopyright.scss';

// 版权
const CompCopyright = (): JSX.Element => {
  const {t} = useTranslate(['footer'], PackageType.UI);

  return (
    <div className="ui-footer_copyright">
      <section>
        <p>{t('license')}</p>
      </section>
    </div>
  );
};

export default CompCopyright;
