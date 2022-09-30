import React, { Component, createRef } from 'react';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '../../src/placements';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destroyTooltipOnHide: false,
      placement: 'right',
      transitionName: 'rc-tooltip-zoom',
      offsetX: placements.right.offset[0],
      offsetY: placements.right.offset[1],
      overlayInnerStyle: undefined,
    };
    this.BtnRef = createRef();
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

  onVisibleChange = visible => {
    console.log('tooltip', visible); // eslint-disable-line no-console
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
        <div style={{ position: 'relative', width: 50 }}>
          <p ref={this.BtnRef} style={{ borderRadius: 10 }}>
            步骤一
          </p>
        </div>

        <div style={{ margin: 100 }}>
          <Tour
            getTooltipContainer={() => this.BtnRef.current}
            placement={placement}
            mouseEnterDelay={0}
            mouseLeaveDelay={0.1}
            destroyTooltipOnHide={this.state.destroyTooltipOnHide}
            onVisibleChange={this.onVisibleChange}
            overlay={
              <div style={{ height: 30, width: 100 }}>i am a tooltip</div>
            }
            align={{
              offset: [this.state.offsetX, this.state.offsetY],
            }}
            overlayInnerStyle={state.overlayInnerStyle}
            popupVisible
          />
        </div>
      </div>
    );
  }
}

export default Test;
