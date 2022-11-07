import React, { forwardRef, useRef, useEffect } from 'react';
import type { FC, Ref } from 'react';
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
  ref?: Ref<HTMLDivElement>;
}

const Mask: FC<MaskProps> = forwardRef<HTMLDivElement, MaskProps>(
  (props, ref) => {
    const { prefixCls, rootClassName, pos, mask, open, animated } = props;

    const id = useId();
    const maskId = `${prefixCls}-mask-${id}`;
    const posRef = useRef(pos);
    const placeholderAnimated =
      typeof animated === 'object' ? animated?.placeholder : animated;

    useEffect(() => {
      posRef.current = pos;
      if (ref != null && typeof ref !== 'function') {
        Array.from(ref?.current?.getElementsByTagName('animate')).forEach(
          (element: SVGAnimateElement | null) => {
            element?.beginElement?.();
          },
        );
      }
    }, [pos]);

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
                    >
                      {placeholderAnimated && (
                        <>
                          <animate
                            xmlns="http://www.w3.org/2000/svg"
                            attributeName="x"
                            attributeType="XML"
                            dur="0.15s"
                            from={posRef.current?.left}
                            to={pos?.left}
                            restart="always"
                          />
                          <animate
                            xmlns="http://www.w3.org/2000/svg"
                            attributeName="y"
                            attributeType="XML"
                            dur="0.15s"
                            from={posRef.current?.top}
                            to={pos?.top}
                            restart="always"
                          />
                        </>
                      )}
                    </rect>
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
  },
);

export default Mask;
