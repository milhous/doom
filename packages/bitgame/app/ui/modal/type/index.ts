import {ModalType} from '@libs/config';

/**
 * 声明 - 弹层数据
 * @property {number} type 类型
 * @property {string} data 数据
 * @property {boolean} isAll 是否关闭所有(默认false)
 */
export interface IModalData {
  type: ModalType;
  data?: any;
  isAll?: boolean;
}
