import React, { useRef } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ margin: 20 }}>
      <div
        style={{
          width: 800,
          height: 500,
          boxShadow: '0 0 0 1px red',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
        }}
        id="inlineHolder"
      >
        <button className="ant-target" ref={createBtnRef}>
          Create
        </button>

        <Tour
          defaultOpen
          defaultCurrent={0}
          getPopupContainer={false}
          style={{ background: 'red' }}
          steps={[
            {
              title: '创建',
              description: '创建一条数据',
              target: () => createBtnRef.current,
              mask: true,
            },
          ]}
        />
      </div>

      <div style={{ height: '200vh' }} />
    </div>
  );
};

export default App;
