'use client';

import {Provider} from 'react-redux';
import store from '@game/stores/bingo';

const BingoProvider = (props: {children: React.ReactNode}) => {
  const {children} = props;
  return <Provider store={store}>{children}</Provider>;
};

export default BingoProvider;
