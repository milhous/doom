import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';
import WidgetFaq from '@widget/faq';

import {getInvitationInfo} from '@referral/api';

import './HomeFaq.scss';

async function getData() {
  const res = await getInvitationInfo();

  return res;
}

// 常见问题
const HomeFaq = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['referral'], PackageType.REFERRAL);

  const data = await getData();

  const {
    firstBet = 0,
    lutPrize = 0,
    betDivisor = 0,
    rebateAmount = 0,
    singleLimit = 0,
    rebateLimit = 0,
    flowRate = 0,
  } = data;

  const list: {question: string; answer: string}[] = [];

  for (let i = 0; i < 6; i++) {
    const index = i + 1;

    const question = t('faq_q' + index);
    let answer = t('faq_a' + index);

    switch (index) {
      case 3:
        answer = t('faq_a' + index, {lutPrize, rebateAmount});

        break;
      case 4:
        answer = t('faq_a' + index, {firstBet, lutPrize});

        break;
      case 5:
        answer = t('faq_a' + index, {
          betDivisor,
          rebateAmount,
          singleLimit,
          rebateLimit,
        });

        break;
      case 6:
        answer = t('faq_a' + index, {flowRate});

        break;
    }

    list.push({
      question,
      answer,
    });
  }

  return (
    <section className="referral-faq">
      <WidgetFaq title={t('faq_title')} list={list} />
    </section>
  );
};

export default HomeFaq;
