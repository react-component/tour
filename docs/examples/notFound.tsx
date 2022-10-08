import React from 'react';
import Tour from '../../src/index';
import './basic.less';

const MyControl = () => {
  return (
    <div style={{ margin: 20 }}>
      <Tour
        placement={'bottom'}
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

export default MyControl;
