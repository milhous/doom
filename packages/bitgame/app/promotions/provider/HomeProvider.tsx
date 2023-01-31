'use client';

import React, {createContext, useReducer, useContext, useMemo} from 'react';

import {reducer, initialState, IPromotionsReducerState, IPromotionsReducerAction} from './homeReducer';

/**
 * 声明
 * @param {IPromotionsReducerState} state 状态
 * @param {function} dispatch 分发函数
 */
interface IHomeContextProps {
  state: IPromotionsReducerState;
  dispatch: React.Dispatch<IPromotionsReducerAction>;
}

const CountContext = createContext({} as IHomeContextProps);

// Home Provider
export const HomeProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return {state, dispatch};
  }, [state, dispatch]);

  return <CountContext.Provider value={contextValue}>{children}</CountContext.Provider>;
};

// Home Hook
export const useHome = () => {
  const contextValue = useContext(CountContext);

  return contextValue;
};
