'use client';

import {Suspense, useState, useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';

import Portal from './portal';
import './index.scss';

// 弹层
const WidgetModal = (props: IWidgetModalProps): JSX.Element => {
  const {classname = '', isActive, disableMaskClick = true, onShow, onClose, children} = props;
  const nodeRef = useRef(null);

  const [isIn, setInState] = useState<boolean>(isActive);

  useEffect(() => {
    setInState(isActive);
  }, [isActive]);

  // 关闭
  const handleClose = (evt: any) => {
    evt.stopPropagation();

    if (disableMaskClick) {
      return;
    }

    setInState(false);
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
