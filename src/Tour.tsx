import * as React from 'react';
import { useRef, forwardRef, useState, useLayoutEffect } from 'react';
import Trigger from 'rc-trigger';
import type { TriggerProps } from 'rc-trigger';

import { TourProvider } from './context';
import TourStep from './TourStep';
import Mask from './Mask';
import placements from './placements';
import type { TourStepProps } from './TourStep';
import type { placementType } from './placements';

export interface TourProps extends TriggerProps {
  steps: TourStepProps[]; // 引导步骤
  open: boolean; // 受控打开引导（与 current 受控分开）
  current: number; // 受控当前处于哪一步
  onChange: (current: number) => void; // 步骤改变时的回调，current为改变前的步骤，next为改变后的步骤
  onClose: (current: number) => void; // 关闭引导时的回调
  onFinish: () => void; // 完成引导时的回调
  mask: boolean; // true,	整体是否启用蒙层
  arrow: boolean | { pointAtCenter: boolean };
  rootClassName: string;
  placement?: placementType;
}

const Tour: React.FC<TourProps> = (props: TourProps) => {
  const {
    popupClassName,
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
  const getPopupElement = () => {
    return [
      arrow && <div className={`${prefixCls}-arrow`} key="arrow" />,
      <TourStep
        key="content"
        prefixCls={prefixCls}
        rootClassName={rootClassName}
        steps={steps}
        current={currentStep}
        {...steps[currentStep]}
      />,
    ];
  };
  const {
    target,
    placement = 'bottom',
    style: stepStyle,
  } = steps[currentStep] || {};
  const [mergedPlacement, setMergedPlacement] = useState(placement);
  const popupVisible = 0 <= currentStep && currentStep < steps.length;
  const maskRef = useRef(null);

  useLayoutEffect(() => {
    const targetDom = typeof target === 'function' ? target() : target;
    if (!targetDom) {
      console.log('-----这里只有notFound执行');
      setMergedPlacement('center');
    }
  }, [target]);

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
        popupPlacement={mergedPlacement}
        builtinPlacements={placements}
        popupVisible={popupVisible}
        key={currentStep}
        popupClassName={rootClassName}
        prefixCls={prefixCls}
        popup={getPopupElement}
        autoDestroy={true}
      >
        <></>
      </Trigger>
      <Mask
        prefixCls={prefixCls}
        steps={steps}
        ref={maskRef}
        rootClassName={rootClassName}
      />
    </TourProvider>
  );
};

export default forwardRef(Tour);
