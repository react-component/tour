import React, { useState, useEffect, forwardRef } from 'react';
import classNames from 'classnames';
import Portal from '@rc-component/portal';
import { isInViewPort } from './util';

export interface MaskProps {
  prefixCls?: string;
  target: () => HTMLElement; //	获取引导卡片指向的元素
  rootClassName?: string;
  mask?: boolean;
}

const Mask = forwardRef<SVGSVGElement, MaskProps>((props, ref) => {
  const { prefixCls, rootClassName, target, mask } = props;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maskLeft, setLeft] = useState<number>(0);
  const [maskTop, setTop] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [currentDOM, setCurrentDom] = useState<HTMLElement | null>(null);

  const documentWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  const documentHeight =
    document.documentElement.clientHeight || document.body.clientHeight;

  const setPosition = () => {
    setCurrentDom(typeof target === 'function' ? target() : target);

    if (currentDOM) {
      if (!isInViewPort(currentDOM)) {
        currentDOM.scrollIntoView(true);
      }
      const { left, top } = currentDOM.getBoundingClientRect();
      const { offsetWidth, offsetHeight, style } = currentDOM || {};
      const { borderRadius = 0 } = style;
      setWidth(offsetWidth);
      setHeight(offsetHeight);
      setLeft(left);
      setTop(top);

      if (borderRadius) {
        setRound(parseInt(borderRadius));
      }
    }
  };
  useEffect(() => {
    setPosition();
  });

  return (
    <Portal open={mask} autoLock>
      <div className={classNames(`${prefixCls}-root`, rootClassName)}>
        <svg
          className={classNames(`${prefixCls}-mask`, rootClassName)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: documentWidth,
            height: documentHeight,
            zIndex: 1060,
          }}
          ref={ref}
        >
          <defs>
            <mask id="mask-main">
              <rect
                x="0"
                y="0"
                width={documentWidth}
                height={documentHeight}
                fill="white"
              />
              <rect
                x={maskLeft}
                y={maskTop}
                width={width}
                height={height}
                rx={round}
                ry={round}
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width={documentWidth}
            height={documentHeight}
            fill="rgba(0,0,0,0.5)"
            mask="url(#mask-main)"
          />
        </svg>
      </div>
    </Portal>
  );
});

export default Mask;
