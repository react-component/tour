import React, { version } from 'react';
import classNames from 'classnames';
import Portal from '../../src';
import './basic.less';

export default () => {
  const [show, setShow] = React.useState(true);
  const [customizeContainer, setCustomizeContainer] = React.useState(false);
  const [lock, setLock] = React.useState(true);

  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(
    () => () => {
      console.log('Demo unmount!!');
    },
    [],
  );

  const getContainer = customizeContainer ? () => divRef.current : undefined;
  const contentCls = customizeContainer ? '' : 'abs';

  return (
    <React.StrictMode>
      <div style={{ height: '200vh' }}>
        <div style={{ border: '2px solid red' }}>
          Real Version: {version}
          <button onClick={() => setShow(!show)}>
            show: {show.toString()}
          </button>
          <button onClick={() => setCustomizeContainer(!customizeContainer)}>
            customize container: {customizeContainer.toString()}
          </button>
          <button onClick={() => setLock(!lock)}>
            lock scroll: {lock.toString()}
          </button>
          <div
            id="customize"
            ref={divRef}
            style={{ border: '1px solid green', minHeight: 10 }}
          />
        </div>

        <Portal open={show} getContainer={getContainer} autoLock={lock}>
          <p className={classNames(contentCls, 'root')}>Hello Root</p>
          <Portal open={show} getContainer={getContainer} autoLock={lock}>
            <p className={classNames(contentCls, 'parent')}>Hello Parent</p>
            <Portal open={show} getContainer={getContainer} autoLock={lock}>
              <p className={classNames(contentCls, 'children')}>
                Hello Children
              </p>
            </Portal>
          </Portal>
        </Portal>
      </div>
    </React.StrictMode>
  );
};
