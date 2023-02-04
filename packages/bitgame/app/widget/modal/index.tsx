'use client';

import {Suspense, useState, useEffect, useRef, useMemo} from 'react';
import {CSSTransition} from 'react-transition-group';

import Portal from './portal';
import './index.scss';

// 弹层
const WidgetModal = (props: IWidgetModalProps): JSX.Element => {
  const {classname = '', isActive, disableMaskClick = false, onShow, onClose, children} = props;
  const nodeRef = useRef(null);

  const [visible, setVisible] = useState<boolean>(false);
  const isIn = useMemo(() => {
    return isActive && visible;
  }, [isActive, visible]);

  useEffect(() => {
    setVisible(isActive);
  }, [isActive]);

  // 关闭
  const handleClose = (evt: any) => {
    evt.stopPropagation();

    if (disableMaskClick) {
      return;
    }

    setVisible(false);
  };

  return (
    <Portal selector="widgetModal">
      <CSSTransition
        in={isIn}
        timeout={300}
        classNames="widget-modal"
        unmountOnExit
        onEnter={() => !!onShow && onShow()}
        onExited={() => !!onClose && onClose()}
        nodeRef={nodeRef}
      >
        <Suspense fallback="Loading">
          <div className={`widget-modal ${classname}`} ref={nodeRef}>
            <div className="widget-modal_mask" onClick={handleClose}></div>
            <div className="widget-modal_container">
              <div className="widget-modal_content">{children}</div>
            </div>
          </div>
        </Suspense>
      </CSSTransition>
    </Portal>
  );
};

export default WidgetModal;
