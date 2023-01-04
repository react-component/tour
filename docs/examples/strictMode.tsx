import React, { StrictMode } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ margin: 20 }}>
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Open: {String(open)}
      </button>

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
