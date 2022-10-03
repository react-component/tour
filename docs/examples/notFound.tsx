import React, { Component, createRef } from 'react';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '../../src/placements';

const MyControl = () => {
  return (
    <div style={{ margin: 20 }}>
      <Tour
        getTourContainer={() => this.BtnRef.current}
        placement={'bottom'}
        // mouseEnterDelay={0}
        // mouseLeaveDelay={0.1}
        // destroyTourOnHide={this.state.destroyTourOnHide}
        // onVisibleChange={this.onVisibleChange}
        // overlay={
        //   <div style={{ height: 30, width: 100 }}>i am a tour</div>
        // }
        // align={{
        //   offset: [this.state.offsetX, this.state.offsetY],
        // }}
        current={0}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: null,
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
