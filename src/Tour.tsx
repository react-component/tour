import * as React from 'react';
import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import Trigger from 'rc-trigger';
import type { TriggerProps } from 'rc-trigger';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import TourContext, { TourProvider } from './context';
import type {
  AlignType,
  AnimationType,
  ActionType,
} from 'rc-trigger/lib/interface';
import { placements as builtinPlacements } from './placements';
import TourStep from './TourStep';
import Mask from './Mask';
import type { TourStepProps } from './TourStep';

// TODO
// 2. prefixCls 改为 rc-tour
// 3. 非块级元素获取不到 width,height, 测试场景,  弹窗居中的场景
// 4. 参考https://ant.design/components/popover-cn/ demo
// 5. 找不到target如何居中

export interface TourProps extends TriggerProps {
  steps: TourStepProps[]; // 引导步骤
  open: boolean; // 受控打开引导（与 current 受控分开）
  current: number; // 受控当前处于哪一步
  onChange: (current: number) => void; // 步骤改变时的回调，current为改变前的步骤，next为改变后的步骤
  onClose: (current: number) => void; // 关闭引导时的回调
  onFinish: () => void; // 完成引导时的回调
  mask: boolean; // 	true,	整体是否启用蒙层
  arrow: boolean | { pointAtCenter: boolean }; //	true	整体是否显示箭头，包含是否指向元素中心的配置
  type: 'default' | 'primary'; //	default	整体类型，影响底色与文字颜色
}

const Tour = (props: TourProps, ref: any) => {
  const {
    popupClassName,
    mouseEnterDelay = 0,
    mouseLeaveDelay = 0.1,
    prefixCls = 'rc-tour',
    children,
    // onVisibleChange,
    afterVisibleChange,
    transitionName,
    animation,
    motion,
    placement = 'right',
    // align = {},
    // destroyTourOnHide = false,
    // defaultVisible,
    // getMergePopupContainer,
    overlayInnerStyle,
    arrowContent,
    overlay,
    showArrow,
    maskClassName,
    maskStyle = {
      zIndex: 1060,
    },
    steps,
    open,
    current = 0,
    onChange,
    onClose,
    onFinish,
    mask = true, //	整体是否启用蒙层
    arrow,
    type,
    rootClassName,
    ...restProps
  } = props;

  const { popupAlign } = props;

  const domRef = useRef(null);
  useImperativeHandle(ref, () => domRef.current);
  const [currentStep, setCurrentStep] = useState(current);
  const getPopupElement = () => {
    const { showArrow = true, arrowContent = null, overlay } = props;
    return [
      showArrow && (
        <div className={`${prefixCls}-arrow`} key="arrow">
          {arrowContent}
        </div>
      ),
      <TourStep
        key="content"
        prefixCls={prefixCls}
        overlay={overlay}
        rootClassName={rootClassName}
        steps={steps}
        current={currentStep}
        {...steps[currentStep]}
        // overlayInnerStyle={overlayInnerStyle}
      />,
    ];
  };

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
  const popupVisible = 0 <= currentStep && currentStep < steps.length;

  const setPostion = () => {
    setCurrentDom(
      typeof getMergePopupContainer === 'function'
        ? getMergePopupContainer()
        : getMergePopupContainer,
    );
    if (!currentDOM) {
      // popupAlign = {
      //   // points: ['c', 'c'], // align top left point of sourceNode with top right point of targetNode
      //   // overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed,
      //   // ...popupAlign,
      //   points: [`cc`, `cc`],
      //   overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed,,
      //   useCssTransform: true,
      // };
    } else {
      const { left, top } = currentDOM.getBoundingClientRect();
      const { offsetWidth, offsetHeight, style = {} } = currentDOM || {};
      const { borderRadius = 0 } = style;
      setWidth(offsetWidth);
      setHeight(offsetHeight);
      setLeft(left);
      setTop(top);
      // console.log('left', left);
      // console.log('top', top);

      if (borderRadius) {
        setRound(parseInt(borderRadius));
      }
    }
  };
  useEffect(() => {
    setPostion();
  });

  const maskNode: React.ReactNode = (
    <CSSMotion key="mask" visible={mask}>
      {(
        { className: motionMaskClassName, style: motionMaskStyle },
        maskRef,
      ) => {
        return (
          <svg
            className={classNames(
              `${prefixCls}-mask`,
              motionMaskClassName,
              maskClassName,
            )}
            // onClick={maskClosable ? onClose : undefined}
            ref={maskRef}
            style={{
              ...motionMaskStyle,
              ...maskStyle,
              position: 'absolute',
              top: 0,
              left: 0,
              width: documentWidth,
              height: documentHeight,
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
        );
      }}
    </CSSMotion>
  );
  return (
    <TourProvider
      value={{
        currentStep,
        setCurrentStep,
      }}
    >
      <Trigger
        key={currentStep}
        popupClassName={rootClassName}
        prefixCls={prefixCls}
        popup={getPopupElement}
        builtinPlacements={builtinPlacements}
        popupPlacement={placement}
        ref={domRef}
        // getPopupContainer={getMergePopupContainer}
        getPopupContainer={getMergePopupContainer}
        popupMotion={motion}
        popupVisible={popupVisible}
        popupAlign={popupAlign}
        {...restProps}
      >
        <></>
      </Trigger>
      <Mask
        prefixCls={prefixCls}
        visible={popupVisible}
        steps={steps}
        rootClassName={rootClassName}
      />
      {/* {popupVisible ? maskNode : null} */}
    </TourProvider>
  );
};

export default forwardRef(Tour);
