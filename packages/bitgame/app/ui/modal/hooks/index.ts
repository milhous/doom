import {useState, useEffect, Dispatch, SetStateAction} from 'react';

import {CustomEventType, ModalType} from '@libs/config';

import {IModalData} from '../type';

/**
 * hook - 弹层
 * @param {number} targetType 当前弹层类型
 */
export const useModal = (
  targetType: number,
): {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: any;
} => {
  // 是否显示
  const [visible, setVisible] = useState<boolean>(false);
  // 是否显示
  const [data, setData] = useState<any>();

  // 显示
  const onShow = ({detail}: any) => {
    const {type, data} = detail as IModalData;

    if (targetType === type) {
      setVisible(true);
      setData(data);
    }
  };

  // 关闭
  const onClose = ({detail}: any) => {
    const {type, isAll = false} = detail as IModalData;

    if (isAll || targetType === type || ModalType.NONE === type) {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener(CustomEventType.MODAL_SHOW, onShow);
    window.addEventListener(CustomEventType.MODAL_CLOSE, onClose);

    return () => {
      window.removeEventListener(CustomEventType.MODAL_SHOW, onShow);
      window.removeEventListener(CustomEventType.MODAL_CLOSE, onClose);
    };
  }, []);

  return {
    visible,
    data,
    setVisible,
  };
};
