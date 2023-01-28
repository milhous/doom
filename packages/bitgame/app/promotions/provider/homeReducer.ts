import {PromotionsType} from '@libs/config';

/**
 * 声明
 * @param {string} promotionsType 活动类型
 */
export interface IPromotionsReducerState {
  promotionsType: string;
}

/**
 * 声明
 * @param {string} tpye 类型
 * @param {string} payload 数据
 */
export interface IPromotionsReducerAction {
  type: string;
  payload?: any;
}

/**
 * 事件类型
 * @property SWITCH 切换
 */
export const PromotionsReducerEventType = {
  SWITCH: 'PROMOTIONS_TYPE_SWITCH',
};

// 初始化状态
export const initialState = {
  promotionsType: PromotionsType[PromotionsType.ALL],
};

// Promotions reducer
export const reducer = (state: IPromotionsReducerState, action: IPromotionsReducerAction): any => {
  switch (action.type) {
    case PromotionsReducerEventType.SWITCH: {
      const {promotionsType} = action.payload;

      return {
        ...state,
        promotionsType,
      };
    }
    default:
      throw new Error('Unexpected action');
  }
};
