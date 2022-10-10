import * as React from 'react';
import { useRef, forwardRef, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import TourStep from './TourStep';
import Mask from './Mask';
import placements from './placements';
import type { TourStepProps } from './TourStep';
import type { PlacementType } from './placements';

export interface TourProps {
  steps: TourStepProps[];
  open?: boolean;
  defaultCurrent?: number;
  current?: number;
  onChange?: (current: number) => void;
  onClose?: () => void;
  onFinish?: () => void;
  mask?: boolean;
  arrow?: boolean | { pointAtCenter: boolean };
  rootClassName?: string;
  placement?: PlacementType;
  prefixCls?: string;
  renderPanel?: (panel: TourStepProps) => ReactNode;
}

const Tour = (props: TourProps) => {
  const {
    prefixCls = 'rc-tour',
    steps,
    defaultCurrent,
    current,
    onChange,
    onClose,
    onFinish,
    open,
    mask = true,
    arrow = true,
    rootClassName,
    placement = 'bottom',
    renderPanel,
    ...restProps
  } = props;

  const [mergedCurrent, setMergedCurrent] = useMergedState(0, {
    value: current,
    defaultValue: defaultCurrent,
  });

  const [mergedOpen, setMergedOpen] = useMergedState(true, {
    value: open,
    postState: origin => {
      if (mergedCurrent < 0 || mergedCurrent >= steps.length) {
        return false;
      }
      return origin;
    },
  });

  const {
    target,
    placement: stepPlacement,
    style: stepStyle,
    arrow: stepArrow,
    className: stepClassName,
    mask: stepMask,
  } = steps[mergedCurrent] || {};

  const mergedMask = mergedOpen && (stepMask ?? mask);
  const [mergedPlacement, setMergedPlacement] = useMergedState(placement, {
    value: stepPlacement,
  });

  useLayoutEffect(() => {
    const targetDom = typeof target === 'function' ? target() : target;
    if (!targetDom) {
      setMergedPlacement('center');
    }
  }, [target]); //eslint-disable-line

  const mergedArrow = typeof stepArrow === 'undefined' ? arrow : stepArrow;

  const pointAtCenter =
    typeof mergedArrow === 'object' ? mergedArrow.pointAtCenter : false;

  const arrowClassName = classNames(`${prefixCls}-arrow`, {
    [`${prefixCls}-arrow-center`]: pointAtCenter,
  });

  const maskRef = useRef<SVGSVGElement>(null);

  const getPopupElement = () => {
    return (
      <>
        {mergedArrow && <div className={arrowClassName} key="arrow" />}
        <TourStep
          key="content"
          prefixCls={prefixCls}
          stepsLength={steps.length}
          renderPanel={renderPanel}
          onChange={onChange}
          onPrev={() => {
            setMergedCurrent(mergedCurrent - 1);
          }}
          onNext={() => {
            setMergedCurrent(mergedCurrent + 1);
          }}
          onClose={() => {
            setMergedCurrent(-1);
            onClose?.();
          }}
          current={mergedCurrent}
          onFinish={() => {
            setMergedCurrent(-1);
            onFinish?.();
          }}
          setOpen={setMergedOpen}
          {...steps[mergedCurrent]}
        />
      </>
    );
  };

  return (
    <>
      <Trigger
        {...restProps}
        getPopupContainer={target}
        popupAlign={placements[mergedPlacement]}
        popupStyle={stepStyle}
        popupPlacement={mergedPlacement}
        builtinPlacements={placements}
        popupVisible={mergedOpen}
        key={mergedCurrent}
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
        mask={mergedMask}
      />
    </>
  );
};

export default forwardRef(Tour);
