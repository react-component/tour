import React, { useRef } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const secondBtnRef = useRef<HTMLButtonElement>(null);
  const thirdBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <React.StrictMode>
    <div style={{ margin: 20 }}>
      <div>
        <button
          className="ant-target"
          ref={firstBtnRef}
        >
          One
        </button>
        <button className="ant-target" ref={secondBtnRef}>
          Two
        </button>
        <button className="ant-target" ref={thirdBtnRef}>
          Three
        </button>
      </div>

      <div style={{ height: 200 }} />

      <Tour
        defaultCurrent={0}
        keyboard={true}
        steps={[
          {
            title: 'One',
            target: () => firstBtnRef.current,
          },
          {
            title: 'Two',
            target: () => secondBtnRef.current,
          },
          {
            title: 'Three',
            target: () => thirdBtnRef.current,
          },
        ]}
      />
    </div>
    </React.StrictMode>
  );
};

export default App;
