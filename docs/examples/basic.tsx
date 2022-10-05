import React, { Component, createRef } from 'react';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '../../src/placements';

class Test extends Component {
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
    this.BtnRef = createRef();
    this.createBtnRef = createRef();
    this.updateBtnRef = createRef();
    this.deleteBtnRef = createRef();
  }

  onPlacementChange = e => {
    const placement = e.target.value;
    const { offset } = placements[placement];
    this.setState({
      placement: e.target.value,
      offsetX: offset[0],
      offsetY: offset[1],
    });
  };

  onOffsetXChange = e => {
    const targetValue = e.target.value;
    this.setState({
      offsetX: targetValue || undefined,
    });
  };

  onOffsetYChange = e => {
    const targetValue = e.target.value;
    this.setState({
      offsetY: targetValue || undefined,
    });
  };

  onOverlayInnerStyleChange = () => {
    this.setState(prevState => ({
      overlayInnerStyle: prevState.overlayInnerStyle
        ? undefined
        : { background: 'red' },
    }));
  };

  maskChange = () => {
    this.setState(prevState => ({
      mask: !prevState.mask,
    }));
  };

  preventDefault = e => {
    e.preventDefault();
  };

  componentDidMount() {
    // console.log(' this.BtnRef.current2', this.BtnRef.current.offsetWidth);
  }

  render() {
    const { state } = this;
    const { placement, offsetX, offsetY } = state;
    return (
      <div>
        <div style={{ margin: '10px 20px' }}>
          <label>
            placement:
            <select value={placement} onChange={this.onPlacementChange}>
              {Object.keys(placements).map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            offsetX:
            <input
              type="text"
              value={offsetX}
              onChange={this.onOffsetXChange}
              style={{ width: 50 }}
            />
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            offsetY:
            <input
              type="text"
              value={offsetY}
              onChange={this.onOffsetYChange}
              style={{ width: 50 }}
            />
          </label>
          <label>
            <input
              value="overlayInnerStyle"
              checked={!!state.overlayInnerStyle}
              type="checkbox"
              onChange={this.onOverlayInnerStyleChange}
            />
            overlayInnerStyle(red background)
          </label>
          <label>
            <input
              value="overlayInnerStyle"
              checked={!!state.mask}
              type="checkbox"
              onChange={this.maskChange}
            />
            overlayInnerStyle(red background)
          </label>
        </div>
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
              nextButtonProps: (
                <button className="ant-btn ant-btn-primary">下一步</button>
              ),
              prevButtonProps: (
                <button className="ant-btn ant-btn-primary">上一步</button>
              ),
              type: 'primary',
            },
            {
              title: '更新',
              cover: <img src="example.com" />,
              description: (
                <div>
                  <span>更新一条数据</span>
                  <button>帮助文档</button>
                </div>
              ),
              target: () => this.updateBtnRef.current,
              nextButtonProps: <button>下一步</button>,
              prevButtonProps: <button>上一步</button>,
            },
            {
              title: '删除',
              cover: <video src="example.com" />,
              description: (
                <div>
                  <span>危险操作：删除一条数据</span>
                  <button type="link">帮助文档</button>
                </div>
              ),
              target: () => this.deleteBtnRef.current,
              nextButtonProps: <button>下一步</button>,
              prevButtonProps: <button>上一步</button>,
              finishButtonProps: <button>结束引导</button>,
            },
          ]}
        />
      </div>
    );
  }
}

export default Test;
