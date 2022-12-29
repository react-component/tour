import * as React from 'react';
import type { ReactNode } from 'react';

import Trigger from 'rc-trigger';
import Portal from '@rc-component/portal';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import useTarget from './hooks/useTarget';
import type { Gap } from './hooks/useTarget';
import TourStep from './TourStep';
import type { TourStepInfo } from './TourStep';
import Mask from './Mask';
import placements, { getCenterPlacements } from './placements';
import type { TourStepProps } from './TourStep';
import type { PlacementType } from './placements';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';

const CENTER_ALIGN = {
  points: ['cc', 'cc'],
  offset: [0, 0],
};

const CENTER_PLACEHOLDER: React.CSSProperties = {
  left: '50%',
  top: '50%',
  width: 1,
  height: 1,
};

export interface TourProps {
  steps?: TourStepInfo[];
  open?: boolean;
  defaultCurrent?: number;
  current?: number;
  onChange?: (current: number) => void;
  onClose?: (current: number) => void;
  onFinish?: () => void;
  mask?: boolean | {
    style?: React.CSSProperties;
    // to fill mask color, e.g. rgba(80,0,0,0.5)
    fill?: string;
  };
  arrow?: boolean | { pointAtCenter: boolean };
  rootClassName?: string;
  placement?: PlacementType;
  prefixCls?: string;
  renderPanel?: (props: TourStepProps, current: number) => ReactNode;
  gap?: Gap;
  animated?: boolean | { placeholder: boolean };
}

const Tour = (props: TourProps) => {
  const {
    prefixCls = 'rc-tour',
    steps = [],
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
    gap,
    animated,
    ...restProps
  } = props;

  const [mergedCurrent, setMergedCurrent] = useMergedState(0, {
    value: current,
    defaultValue: defaultCurrent,
  });

  const [mergedOpen, setMergedOpen] = useMergedState(undefined, {
    value: open,
    postState: origin =>
      mergedCurrent < 0 || mergedCurrent >= steps.length
        ? false
        : origin ?? true,
  });

  const openRef = React.useRef(mergedOpen);
  useLayoutEffect(() => {
    if (mergedOpen && !openRef.current) {
      setMergedCurrent(0);
    }
    openRef.current = mergedOpen;
  }, [mergedOpen]);

  const {
    target,
    placement: stepPlacement,
    style: stepStyle,
    arrow: stepArrow,
    className: stepClassName,
    mask: stepMask,
  } = steps[mergedCurrent] || {};

  const mergedPlacement = stepPlacement ?? placement;
  const mergedMask = mergedOpen && (stepMask ?? mask);
  const [posInfo, targetElement] = useTarget(target, open, gap);

  // ========================= arrow =========================
  const mergedArrow = targetElement
    ? typeof stepArrow === 'undefined'
      ? arrow
      : stepArrow
    : false;
  const arrowPointAtCenter =
    typeof mergedArrow === 'object' ? mergedArrow.pointAtCenter : false;

  // ========================= Change =========================
  const onInternalChange = (nextCurrent: number) => {
    setMergedCurrent(nextCurrent);
    onChange?.(nextCurrent);
  };

  // ========================= popupAlign =========================
  const popupAlign = targetElement
    ? arrowPointAtCenter
      ? getCenterPlacements({ placement })
      : placements[mergedPlacement]
    : CENTER_ALIGN;

  // ========================= Render =========================
  // Skip if not init yet
  if (targetElement === undefined) {
    return null;
  }

  const handleClose = () => {
    setMergedOpen(false);
    onClose?.(mergedCurrent);
  };

  const getPopupElement = () => (
    <TourStep
      arrow={mergedArrow}
      key="content"
      prefixCls={prefixCls}
      total={steps.length}
      renderPanel={renderPanel}
      onPrev={() => {
        onInternalChange(mergedCurrent - 1);
      }}
      onNext={() => {
        onInternalChange(mergedCurrent + 1);
      }}
      onClose={handleClose}
      current={mergedCurrent}
      onFinish={() => {
        handleClose();
        onFinish?.();
      }}
      {...steps[mergedCurrent]}
    />
  );

  const mergedShowMask = typeof mergedMask === "boolean" ? mergedMask : !!mergedMask;
  const mergedMaskStyle = typeof mergedMask === "boolean" ? undefined : mergedMask;

  return (
    <>
      <Trigger
        {...restProps}
        popupAlign={popupAlign}
        popupStyle={stepStyle}
        popupPlacement={mergedPlacement}
        builtinPlacements={placements}
        popupVisible={mergedOpen}
        popupClassName={classNames(rootClassName, stepClassName)}
        prefixCls={prefixCls}
        popup={getPopupElement}
        forceRender={false}
        destroyPopupOnHide
        zIndex={1090}
      >
        <Portal open={mergedOpen} autoLock>
          <div
            className={classNames(
              rootClassName,
              `${prefixCls}-target-placeholder`,
            )}
            style={{
              ...(posInfo || CENTER_PLACEHOLDER),
              position: 'fixed',
              pointerEvents: 'none',
            }}
          />
        </Portal>
      </Trigger>
      <Mask
        prefixCls={prefixCls}
        pos={posInfo}
        showMask={mergedShowMask}
        style={mergedMaskStyle?.style}
        fill={mergedMaskStyle?.fill}
        open={mergedOpen}
        animated={animated}
        rootClassName={rootClassName}
      />
    </>
  );
};

export default Tour;
