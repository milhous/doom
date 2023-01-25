'use client';

import {useState, useRef} from 'react';

import {useInterval} from '@libs/hooks';

import './CompPartners.scss';

// 合作商动效
const CompPartnersAnimation = (props: {children: React.ReactNode}): JSX.Element => {
  const {children} = props;
  const [animState, setAnimState] = useState<number>(1);
  const container = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);

  // logo滚动
  useInterval(() => {
    if (!!container.current && !!list.current) {
      const max = list.current.clientHeight / container.current.clientHeight;
      let index = animState + 1;

      if (index > max) {
        index = 1;
      }

      setAnimState(index);
    }
  }, 3000);

  return (
    <section ref={container}>
      <ul className={`state-${animState}`} ref={list}>
        {children}
      </ul>
    </section>
  );
};

export default CompPartnersAnimation;
