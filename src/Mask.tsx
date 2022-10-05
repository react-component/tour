import React, { useState, useContext, useEffect, forwardRef } from 'react';
import classNames from 'classnames';
import TourContext from './context';
import Portal from '@rc-component/portal';
import { isInViewPort } from './util';
const Mask = forwardRef((props: any, ref) => {
  const { steps, prefixCls, scrollLocker, rootClassName } = props;
  const { currentStep, mergeMask } = useContext(TourContext);
  // ============================ Mask ============================
  const documentWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  const documentHeight =
    document.documentElement.clientHeight || document.body.clientHeight;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maskLeft, setLeft] = useState(0);
  const [maskTop, setTop] = useState(0);
  const [round, setRound] = useState(0);
  const [currentDOM, setCurrentDom] = useState(null);

  const mergedTarget = steps[currentStep]?.target;

  const setPosition = () => {
    setCurrentDom(
      typeof mergedTarget === 'function' ? mergedTarget() : mergedTarget,
    );

    if (currentDOM) {
      if (!isInViewPort(currentDOM)) {
        currentDOM.scrollIntoView(true);
      }
      const { left, top } = currentDOM.getBoundingClientRect();
      const { offsetWidth, offsetHeight, style = {} } = currentDOM || {};
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

  useEffect(() => {
    scrollLocker?.lock();
    return scrollLocker?.unLock;
  }, [scrollLocker]);

  return (
    <Portal open={mergeMask} autoLock>
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
