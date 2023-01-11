import React, { StrictMode, useRef } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const btn1 = useRef<HTMLButtonElement>(null);

  return (
    <div style={{ margin: 20 }}>
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Open: {String(open)}
      </button>
      <button ref={btn1}>Upload</button>

      <Tour
        placement={'bottom'}
        open={open}
        onFinish={() => setOpen(false)}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: undefined,
          },
          {
            title: '更新',
            description: '更新一条数据',
            target: () => btn1.current,
          },
        ]}
      />
    </div>
  );
};

export default () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};
