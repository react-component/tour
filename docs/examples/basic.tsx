import React, { Component, createRef } from 'react';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '../../src/placements';

interface RefObject<T> {
  // immutable
  readonly current: T | null;
}
class Test extends Component {
  private BtnRef: RefObject<HTMLButtonElement>;
  private createBtnRef: RefObject<HTMLButtonElement>;
  private updateBtnRef: RefObject<HTMLButtonElement>;
  private deleteBtnRef: RefObject<HTMLButtonElement>;

  constructor(props) {
    super(props);
    this.state = {
      destroyTourOnHide: false,
      placement: 'right',
      transitionName: 'rc-tour-zoom',
      offsetX: placements.right.offset[0],
      offsetY: placements.right.offset[1],
      overlayInnerStyle: undefined,
    };
    this.BtnRef = createRef<HTMLButtonElement>();
    this.createBtnRef = createRef<HTMLButtonElement>();
    this.updateBtnRef = createRef<HTMLButtonElement>();
    this.deleteBtnRef = createRef<HTMLButtonElement>();
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <button className="ant-target" ref={this.createBtnRef}>
            Create
          </button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <button className="ant-target" ref={this.updateBtnRef}>
            Update
          </button>
          <button className="ant-target" ref={this.deleteBtnRef}>
            Delete
          </button>
        </div>

        <Tour
          steps={[
            {
              title: '创建',
              description: '创建一条数据',
              target: () => this.createBtnRef.current,
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
              type: 'primary',
            },
            {
              title: '更新',
              cover: (
                <img
                  src="https://avatars0.githubusercontent.com/u/9441414?s=200&v=4"
                  alt="更新"
                />
              ),
              description: (
                <div>
                  <span>更新一条数据</span>
                  <button>帮助文档</button>
                </div>
              ),
              target: () => this.updateBtnRef.current,
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
            {
              title: '删除',
              cover: <video src="example.com" />,
              description: (
                <div>
                  <span>危险操作：删除一条数据</span>
                  <button>帮助文档</button>
                </div>
              ),
              target: () => this.deleteBtnRef.current,
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
              finishButtonProps: {
                children: <button>结束引导</button>,
              },
            },
          ]}
        />
      </div>
    );
  }
}

export default Test;
