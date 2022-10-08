import * as React from 'react';
import { useRef, forwardRef, useState, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { TourProvider } from './context';
import TourStep from './TourStep';
import Mask from './Mask';
import placements from './placements';
import type { TourStepProps } from './TourStep';
import type { placementType } from './placements';

export interface TourProps {
  steps: TourStepProps[];
  open?: boolean;
  current?: number;
  onChange?: (current: number) => void;
  onClose?: (current: number) => void;
  onFinish?: () => void;
  mask?: boolean;
  arrow?: boolean | { pointAtCenter: boolean };
  rootClassName?: string;
  placement?: placementType;
  children?: React.ReactNode;
  prefixCls?: string;
  renderStep?: (current: number) => ReactNode;
}

const Tour = (props: TourProps) => {
  const {
    prefixCls = 'rc-tour',
    children,
    steps,
    current,
    onChange,
    onClose,
    onFinish,
    mask = true,
    arrow = true,
    rootClassName,
    renderStep,
    renderPanel,
    ...restProps
  } = props;

  // todo currentStep=> mergedCurrent
  const [currentStep, setCurrentStep] = useMergedState(current || 0);
  const [open, setOpen] = useMergedState(true, { value: props.open });

  const {
    target,
    placement: stepPlacement = 'bottom',
    style: stepStyle,
    arrow: stepArrow,
    className: stepClassName,
    mask: stepMask,
  } = steps[currentStep] || {};

  const [mergedMask, setMergedMask] = useMergedState(mask, {
    value: stepMask,
  });

  const mergedArrow = typeof stepArrow === 'undefined' ? arrow : stepArrow;

  const pointAtCenter =
    typeof mergedArrow === 'object' ? mergedArrow.pointAtCenter : false;

  const arrowClassName = classNames(`${prefixCls}-arrow`, {
    [`${prefixCls}-arrow-center`]: pointAtCenter,
  });

  const getPopupElement = () => {
    return [
      mergedArrow && <div className={arrowClassName} key="arrow" />,
      <TourStep
        key="content"
        prefixCls={prefixCls}
        stepsLength={steps.length}
        renderStep={renderStep}
        {...steps[currentStep]}
      />,
    ];
  };

  const [mergedPlacement, setMergedPlacement] = useState(stepPlacement);

  // const popupVisible = 0 <= currentStep && currentStep < steps.length;
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
        open,
        setOpen,
      }}
    >
      <Trigger
        {...restProps}
        getPopupContainer={target}
        popupAlign={placements[mergedPlacement]}
        popupStyle={stepStyle}
        popupPlacement={mergedPlacement}
        builtinPlacements={placements}
        popupVisible={open}
        key={currentStep}
        popupClassName={classNames(rootClassName, stepClassName)}
        prefixCls={prefixCls}
        popup={getPopupElement}
        autoDestroy
      >
        <></>
      </Trigger>
      <Mask
        prefixCls={prefixCls}
        target={target}
        ref={maskRef}
        mask={open && mergedMask}
      />
    </TourProvider>
  );
};

export default forwardRef(Tour);
