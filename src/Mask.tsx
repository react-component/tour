import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Portal from '@rc-component/portal';
import type { PosInfo } from './hooks/useTarget';
import useId from 'rc-util/lib/hooks/useId';

export interface MaskProps {
  prefixCls?: string;
  pos: PosInfo; //	获取引导卡片指向的元素
  rootClassName?: string;
  mask?: boolean;
  open?: boolean;
}

const Mask = forwardRef<HTMLDivElement, MaskProps>((props, ref) => {
  const { prefixCls, rootClassName, pos, mask, open } = props;

  const id = useId();
  const maskId = `${prefixCls}-mask-${id}`;

  return (
    <Portal open={open} autoLock>
      <div
        className={classNames(`${prefixCls}-mask`, rootClassName)}
        ref={ref}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 900,
        }}
      >
        {mask ? (
          <svg
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <defs>
              <mask id={maskId}>
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                {pos && (
                  <rect
                    x={pos.left}
                    y={pos.top}
                    width={pos.width}
                    height={pos.height}
                    fill="black"
                  />
                )}
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.5)"
              mask={`url(#${maskId})`}
            />
          </svg>
        ) : null}
      </div>
    </Portal>
  );
});

export default Mask;
