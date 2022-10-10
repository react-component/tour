import React, { useRef } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ margin: 20 }}>
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <br />
      <p style={{ paddingLeft: 400 }}>
        <span
          ref={btnRef}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          第一步
        </span>{' '}
      </p>
      <Tour
        defaultCurrent={0}
        arrow={{ pointAtCenter: true }}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => btnRef.current,
          },
        ]}
      />
    </div>
  );
};

export default App;
