import type { ReactNode } from 'react';
import * as React from 'react';

import Portal from '@rc-component/portal';
import type { TriggerProps } from '@rc-component/trigger';
import Trigger from '@rc-component/trigger';
import classNames from 'classnames';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { Gap } from './hooks/useTarget';
import useTarget from './hooks/useTarget';
import Mask from './Mask';
import type { PlacementType } from './placements';
import { getPlacements } from './placements';
import type { TourStepInfo, TourStepProps } from './TourStep';
import TourStep from './TourStep';
import { getMergedPlacement } from './util';

const CENTER_PLACEHOLDER: React.CSSProperties = {
  left: '50%',
  top: '50%',
  width: 1,
  height: 1,
};

export interface TourProps
  extends Pick<TriggerProps, 'onPopupAlign' | 'builtinPlacements'> {
  steps?: TourStepInfo[];
  open?: boolean;
  defaultCurrent?: number;
  current?: number;
  onChange?: (current: number) => void;
  onClose?: (current: number) => void;
  onFinish?: () => void;
  mask?:
    | boolean
    | {
        style?: React.CSSProperties;
        // to fill mask color, e.g. rgba(80,0,0,0.5)
        color?: string;
      };
  arrow?: boolean | { pointAtCenter: boolean };
  rootClassName?: string;
  placement?: PlacementType;
  prefixCls?: string;
  renderPanel?: (props: TourStepProps, current: number) => ReactNode;
  gap?: Gap;
  animated?: boolean | { placeholder: boolean };
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
  zIndex?: number;
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
    placement,
    renderPanel,
    gap,
    animated,
    scrollIntoViewOptions = true,
    zIndex = 1001,
    ...restProps
  } = props;

  const triggerRef = React.useRef<{ forceAlign: () => void }>();

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
    scrollIntoViewOptions: stepScrollIntoViewOptions,
  } = steps[mergedCurrent] || {};

  const mergedMask = mergedOpen && (stepMask ?? mask);
  const mergedScrollIntoViewOptions =
    stepScrollIntoViewOptions ?? scrollIntoViewOptions;
  const [posInfo, targetElement] = useTarget(
    target,
    open,
    gap,
    mergedScrollIntoViewOptions,
  );
  const mergedPlacement = getMergedPlacement(
    targetElement,
    placement,
    stepPlacement,
  );

  // ========================= arrow =========================
  const mergedArrow = targetElement
    ? typeof stepArrow === 'undefined'
      ? arrow
      : stepArrow
    : false;
  const arrowPointAtCenter =
    typeof mergedArrow === 'object' ? mergedArrow.pointAtCenter : false;

  useLayoutEffect(() => {
    triggerRef.current?.forceAlign();
  }, [arrowPointAtCenter, mergedCurrent]);

  // ========================= Change =========================
  const onInternalChange = (nextCurrent: number) => {
    setMergedCurrent(nextCurrent);
    onChange?.(nextCurrent);
  };

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

  const mergedShowMask =
    typeof mergedMask === 'boolean' ? mergedMask : !!mergedMask;
  const mergedMaskStyle =
    typeof mergedMask === 'boolean' ? undefined : mergedMask;

  // when targetElement is not exist, use body as triggerDOMNode
  const getTriggerDOMNode = node => {
    return node || targetElement || document.body;
  };

  return (
    <>
      <Mask
        zIndex={zIndex}
        prefixCls={prefixCls}
        pos={posInfo}
        showMask={mergedShowMask}
        style={mergedMaskStyle?.style}
        fill={mergedMaskStyle?.color}
        open={mergedOpen}
        animated={animated}
        rootClassName={rootClassName}
      />
      <Trigger
        builtinPlacements={getPlacements(arrowPointAtCenter)}
        {...restProps}
        ref={triggerRef}
        popupStyle={stepStyle}
        popupPlacement={mergedPlacement}
        popupVisible={mergedOpen}
        popupClassName={classNames(rootClassName, stepClassName)}
        prefixCls={prefixCls}
        popup={getPopupElement}
        forceRender={false}
        destroyPopupOnHide
        zIndex={zIndex}
        getTriggerDOMNode={getTriggerDOMNode}
        arrow={!!mergedArrow}
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
    </>
  );
};

export default Tour;
