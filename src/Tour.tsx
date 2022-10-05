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
}

const Tour = (props: TourProps) => {
  const {
    prefixCls = 'rc-tour',
    children,
    steps,
    open,
    current = 0,
    onChange,
    onClose,
    onFinish,
    mask = true,
    arrow = true,
    rootClassName,
    ...restProps
  } = props;

  const [currentStep, setCurrentStep] = useState<number>(current);
  const [mergeMask, setMergeMask] = useState(mask);
  let pointAtCenter = false;
  if (typeof arrow === 'object') {
    pointAtCenter = arrow.pointAtCenter;
  }

  const getPopupElement = () => {
    const arrowClassName = pointAtCenter
      ? classNames(`${prefixCls}-arrow`, `${prefixCls}-arrow-center`)
      : `${prefixCls}-arrow`;
    return [
      Boolean(arrow) && <div className={arrowClassName} key="arrow" />,
      <TourStep
        key="content"
        prefixCls={prefixCls}
        rootClassName={rootClassName}
        stepsLength={steps.length}
        {...steps[currentStep]}
      />,
    ];
  };
  const {
    target,
    placement = 'bottom',
    style: stepStyle,
    className: stepClassName,
  } = steps[currentStep] || {};
  const [mergedPlacement, setMergedPlacement] = useState(placement);
  const popupVisible = 0 <= currentStep && currentStep < steps.length;
  const maskRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const targetDom = typeof target === 'function' ? target() : target;
    if (!targetDom) {
      console.log('-----这里只有notFound执行');
      setMergedPlacement('center');
    }
  }, [target]);

  console.log('mergedPlacement', mergedPlacement);
  return (
    <TourProvider
      value={{
        currentStep,
        setCurrentStep,
        mergeMask,
        setMergeMask,
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
        mask={mergeMask}
        rootClassName={rootClassName}
      />
    </TourProvider>
  );
};

export default forwardRef(Tour);
