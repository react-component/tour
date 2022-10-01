import * as React from 'react';
import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
  useState,
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
import type { TourStepProps } from './TourStep';

// TODO
// 1. context useContext 修改 current
// 2. prefixCls 改为 rc-tour
// 3. 非块级元素获取不到 width,height, 测试场景,  弹窗居中的场景

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
    popupStyle,
    prefixCls = 'rc-tooltip',
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
    current,
    onChange,
    onClose,
    onFinish,
    mask = true, //	整体是否启用蒙层
    arrow,
    type,
    ...restProps
  } = props;

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
        steps={steps}
        current={currentStep}
        {...steps[currentStep]}
        // overlayInnerStyle={overlayInnerStyle}
      />,
    ];
  };

  const documentWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  const documentHeight =
    document.documentElement.clientHeight || document.body.clientHeight;

  // ============================ Mask ============================
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maskLeft, setLeft] = useState(0);
  const [maskTop, setTop] = useState(0);
  const [round, setRound] = useState(0);
  const [currentDOM, setCurrentDom] = useState(null);
  const getMergePopupContainer = steps[currentStep]?.target;

  useLayoutEffect(() => {
    setCurrentDom(
      typeof getMergePopupContainer === 'function'
        ? getMergePopupContainer()
        : getMergePopupContainer,
    );
    if (!currentDOM) return;
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
  }, [getMergePopupContainer]);

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

  console.log('1', currentStep);
  console.log('2', steps.length);
  console.log('3', -1 < currentStep && currentStep < steps.length);
  return (
    <TourProvider
      value={{
        currentStep,
        setCurrentStep,
      }}
    >
      <Trigger
        popupClassName={popupClassName}
        prefixCls={prefixCls}
        popup={getPopupElement}
        builtinPlacements={builtinPlacements}
        popupPlacement={placement}
        ref={domRef}
        getPopupContainer={getMergePopupContainer}
        popupAnimation={animation}
        popupMotion={motion}
        mouseLeaveDelay={mouseLeaveDelay}
        popupStyle={popupStyle}
        mouseEnterDelay={mouseEnterDelay}
        popupVisible={0 <= currentStep && currentStep < steps.length}
        {...restProps}
      >
        <></>
      </Trigger>
      {maskNode}
    </TourProvider>
  );
};

export default forwardRef(Tour);
