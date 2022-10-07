import * as React from 'react';
import { useRef, forwardRef, useState, useLayoutEffect } from 'react';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import { TourProvider } from './context';
import TourStep from './TourStep';
import Mask from './Mask';
import placements from './placements';
import type { TourStepProps } from './TourStep';
import type { placementType } from './placements';

export interface TourProps {
  steps: TourStepProps[]; // 引导步骤
  open?: boolean; // 受控打开引导（与 current 受控分开）
  current?: number; // 受控当前处于哪一步
  onChange?: (current: number) => void; // 步骤改变时的回调，current为改变前的步骤，next为改变后的步骤
  onClose?: (current: number) => void; // 关闭引导时的回调
  onFinish?: () => void; // 完成引导时的回调
  mask?: boolean; // true,	整体是否启用蒙层
  arrow?: boolean | { pointAtCenter: boolean };
  rootClassName?: string;
  placement?: placementType;
  children?: React.ReactNode;
  prefixCls?: string;
  type?: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
}

const Tour = (props: TourProps) => {
  const {
    prefixCls = 'rc-tour',
    children,
    steps,
    open,
    current,
    onChange,
    onClose,
    onFinish,
    mask = true,
    arrow = true,
    type = 'default',
    rootClassName,
    ...restProps
  } = props;

  const [currentStep, setCurrentStep] = useState<number>(
    open ? current || 0 : -1,
  );

  const {
    target,
    placement: stepPlacement = 'bottom',
    style: stepStyle,
    arrow: stepArrow,
    className: stepClassName,
    mask: stepMask = true,
  } = steps[currentStep] || {};

  const [mergedMask, setMergedMask] = useState(
    open && (typeof stepMask === 'undefined' ? mask : stepMask),
  );

  const mergedArrow = typeof stepArrow === 'undefined' ? arrow : stepArrow;

  const pointAtCenter =
    typeof mergedArrow === 'object' ? mergedArrow.pointAtCenter : false;

  const arrowClassName = pointAtCenter
    ? classNames(`${prefixCls}-arrow`, `${prefixCls}-arrow-center`)
    : `${prefixCls}-arrow`;

  const getPopupElement = () => {
    return [
      mergedArrow && <div className={arrowClassName} key="arrow" />,
      <TourStep
        key="content"
        prefixCls={prefixCls}
        rootClassName={rootClassName}
        stepsLength={steps.length}
        type={type}
        {...steps[currentStep]}
      />,
    ];
  };

  const [mergedPlacement, setMergedPlacement] = useState(stepPlacement);
  const popupVisible = 0 <= currentStep && currentStep < steps.length;
  const maskRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const targetDom = typeof target === 'function' ? target() : target;
    if (!targetDom) {
      setMergedPlacement('center');
    }
  }, [target]);

  return (
    <TourProvider
      value={{
        currentStep,
        setCurrentStep,
        mergedMask,
        setMergedMask,
      }}
    >
      <Trigger
        {...restProps}
        getPopupContainer={target}
        popupAlign={{
          points: placements[mergedPlacement].points,
          offset: placements[mergedPlacement].offset,
        }}
        popupStyle={stepStyle}
        popupPlacement={mergedPlacement}
        builtinPlacements={placements}
        popupVisible={popupVisible}
        key={currentStep}
        popupClassName={classNames(rootClassName, stepClassName)}
        prefixCls={prefixCls}
        popup={getPopupElement}
        autoDestroy={true}
      >
        <></>
      </Trigger>
      <Mask
        prefixCls={prefixCls}
        target={target}
        ref={maskRef}
        mask={mergedMask}
        rootClassName={rootClassName}
      />
    </TourProvider>
  );
};

export default forwardRef(Tour);
