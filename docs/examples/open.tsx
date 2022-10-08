import React from 'react';
import Tour from '../../src/index';
import './basic.less';

const MyControl = () => {
  return (
    <div style={{ margin: 20 }}>
      <Tour
        placement={'bottom'}
        open={false}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: undefined,
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
