import React from 'react';
import classNames from 'classnames';
import Portal from '@rc-component/portal';
import type { PosInfo } from './hooks/useTarget';
import useId from 'rc-util/lib/hooks/useId';

const COVER_PROPS = {
  fill: 'transparent',
  pointerEvents: 'auto',
};

export interface MaskProps {
  prefixCls?: string;
  pos: PosInfo; //	获取引导卡片指向的元素
  rootClassName?: string;
  mask?: boolean;
  open?: boolean;
  animated?: boolean | { placeholder: true };
}

const Mask = (props: MaskProps) => {
  const { prefixCls, rootClassName, pos, mask, open, animated } = props;

  const id = useId();
  const maskId = `${prefixCls}-mask-${id}`;
  const mergedAnimated =
    typeof animated === 'object' ? animated?.placeholder : animated;

  return (
    <Portal open={open} autoLock>
      <div
        className={classNames(`${prefixCls}-mask`, rootClassName)}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 900,
          pointerEvents: 'none',
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
                    rx={pos.radius}
                    width={pos.width}
                    height={pos.height}
                    fill="black"
                    className={
                      mergedAnimated ? `${prefixCls}-placeholder-animated` : ''
                    }
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

            {/* Block click region */}
            {pos && (
              <>
                <rect
                  {...COVER_PROPS}
                  x="0"
                  y="0"
                  width="100%"
                  height={pos.top}
                />
                <rect
                  {...COVER_PROPS}
                  x="0"
                  y="0"
                  width={pos.left}
                  height="100%"
                />
                <rect
                  {...COVER_PROPS}
                  x="0"
                  y={pos.top + pos.height}
                  width="100%"
                  height={`calc(100vh - ${pos.top + pos.height}px)`}
                />
                <rect
                  {...COVER_PROPS}
                  x={pos.left + pos.width}
                  y="0"
                  width={`calc(100vw - ${pos.left + pos.width}px)`}
                  height="100%"
                />
              </>
            )}
          </svg>
        ) : null}
      </div>
    </Portal>
  );
};

export default Mask;
