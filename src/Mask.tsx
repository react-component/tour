import React, { useState, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import TourContext, { TourConsumer } from './context';
import Portal from '@rc-component/portal';
const Mask = (props: any) => {
  const [content, setContent] = useState(new Date().toString());
  const [dialogVisible, setDialogVisible] = useState(false);
  const { steps, prefixCls, visible, scrollLocker, rootClassName } = props;
  console.log('render');
  const { currentStep, setCurrentStep } = useContext(TourContext);
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

  const getMergePopupContainer = steps[currentStep]?.target;
  console.log(666, steps);
  const [div, setDiv] = useState(document.createElement('div'));
  const setPostion = () => {
    console.log('00000', getMergePopupContainer);
    setCurrentDom(
      typeof getMergePopupContainer === 'function'
        ? getMergePopupContainer()
        : getMergePopupContainer,
    );

    if (!currentDOM) {
      console.log('555555');
      // popupAlign = {
      //   // points: ['c', 'c'], // align top left point of sourceNode with top right point of targetNode
      //   // overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed,
      //   // ...popupAlign,
      //   points: [`cc`, `cc`],
      //   overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed,,
      //   useCssTransform: true,
      // };
    } else {
      console.log('3333');
      const { left, top } = currentDOM.getBoundingClientRect();
      const { offsetWidth, offsetHeight, style = {} } = currentDOM || {};
      const { borderRadius = 0 } = style;
      setWidth(offsetWidth);
      setHeight(offsetHeight);
      setLeft(left);
      setTop(top);
      console.log('left', left);
      console.log('top', top);

      if (borderRadius) {
        setRound(parseInt(borderRadius));
      }
    }
  };
  useEffect(() => {
    setPostion();
  });

  // const div = document.createElement('div');

  useEffect(() => {
    // console.log('----------------------------->>111111');
    // document.body.appendChild(div);
    return () => {
      // console.log('----------------------------->>2222222');
      // document.body.removeChild(div);
    };
  }, []);

  useEffect(() => {
    scrollLocker?.lock();
    return scrollLocker?.unLock;
  }, [scrollLocker]);

  console.log('rootClassName', rootClassName);
  return (
    <Portal open={visible} autoLock>
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
};

export default Mask;
