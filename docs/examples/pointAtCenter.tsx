import React, { useRef } from 'react';
import Tour from '../../src/index';
import './basic.less';

const MyControl = () => {
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
        current={0}
        arrow={{ pointAtCenter: true }}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => btnRef.current,
            nextButtonProps: {
              children: (
                <button className="ant-btn ant-btn-primary">下一步</button>
              ),
            },
            prevButtonProps: {
              children: (
                <button className="ant-btn ant-btn-primary">上一步</button>
              ),
            },
          },
        ]}
      />
    </div>
  );
};

export default MyControl;
