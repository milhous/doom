import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';
import WidgetFaq from '@widget/faq';

import './HomeFaq.scss';

// 常见问题
const HomeFaq = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['affiliate'], PackageType.AFFILIATE);

  const list: {question: string; answer: string}[] = [];

  for (let i = 0; i < 6; i++) {
    const index = i + 1;

    list.push({
      question: t('faq_q' + index),
      answer: t('faq_a' + index),
    });
  }

  return (
    <section className="affiliate-faq">
      <WidgetFaq title={t('faq_title')} list={list} />
    </section>
  );
};

export default HomeFaq;
