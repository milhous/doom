import {headers} from 'next/headers';
import {NextRequest} from 'next/server';

import {useTranslation} from '@libs/i18n/server';
import WidgetFaq from '@widget/faq';

import './HomeFaq.scss';

async function getData() {
  const headersList = headers();
  const host = headersList.get('host');
  const url = `http://localhost:3000/api/graphql`;
  const query =
    '{ invitationInfo {firstBet, lutPrize, betDivisor, rebateAmount, singleLimit, rebateLimit, flowRate, inviteLimt, inviteCode } }';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({query}),
  });

  return res.json();

  //const res = await fetch(`${protocol}${host}/api/user`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }

  // return res.json();
}

// 常见问题
const HomeFaq = async (): Promise<JSX.Element> => {
  const {t} = await useTranslation(['referral']);

  // const {data} = await getData();

  const {
    firstBet = 0,
    lutPrize = 0,
    betDivisor = 0,
    rebateAmount = 0,
    singleLimit = 0,
    rebateLimit = 0,
    flowRate = 0,
  } = {};
  // data.invitationInfo;

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
