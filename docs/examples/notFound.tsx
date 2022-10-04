import React, { Component, createRef } from 'react';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '../../src/placements';

const MyControl = () => {
  return (
    <div style={{ margin: 20 }}>
      <Tour
        placement={'bottom'}
        current={0}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: undefined,
            nextButtonProps: (
              <button className="ant-btn ant-btn-primary">下一步</button>
            ),
            prevButtonProps: (
              <button className="ant-btn ant-btn-primary">上一步</button>
            ),
          },
        ]}
      />
    </div>
  );
};

export default MyControl;
