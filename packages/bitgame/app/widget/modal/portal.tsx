import {useRef, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

// 获取容器
const getContainer = (selector: string): any => {
  let container = document.querySelector('#' + selector);

  if (!container) {
    container = document.createElement('div');
    container.id = selector;
    document.body.appendChild(container);
  }

  return container;
};

const Portal = ({children, selector}) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = getContainer(selector);

    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

export default Portal;
