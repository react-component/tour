import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Portal from '@rc-component/portal';
import type { posType } from './hooks';

export interface MaskProps {
  prefixCls?: string;
  pos: posType; //	获取引导卡片指向的元素
  rootClassName?: string;
  mask?: boolean;
  open?: boolean;
}

const Mask = forwardRef<HTMLDivElement, MaskProps>((props, ref) => {
  const { prefixCls, rootClassName, pos, mask, open } = props;
  return (
    <Portal open={open} autoLock>
      <div className={classNames(`${prefixCls}-root`, rootClassName)} ref={ref}>
        {mask ? (
          <svg
            className={classNames(`${prefixCls}-mask`, rootClassName)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: pos.documentWidth,
              height: pos.documentHeight,
              zIndex: 900,
            }}
          >
            <defs>
              <mask id="mask-main">
                <rect
                  x="0"
                  y="0"
                  width={pos.documentWidth}
                  height={pos.documentHeight}
                  fill="white"
                />
                <rect
                  x={pos.left}
                  y={pos.top}
                  width={pos.width}
                  height={pos.height}
                  rx={pos.round}
                  ry={pos.round}
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width={pos.documentWidth}
              height={pos.documentHeight}
              fill="rgba(0,0,0,0.5)"
              mask="url(#mask-main)"
            />
          </svg>
        ) : null}
      </div>
    </Portal>
  );
});

export default Mask;
