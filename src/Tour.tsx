import type { ReactNode } from 'react';
import * as React from 'react';

import Portal from '@rc-component/portal';
import type { TriggerProps, TriggerRef } from '@rc-component/trigger';
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
import { getPlacement } from './util';
import { useMemo } from 'react';

const CENTER_PLACEHOLDER: React.CSSProperties = {
  left: '50%',
  top: '50%',
  width: 1,
  height: 1,
};
const defaultScrollIntoViewOptions: ScrollIntoViewOptions = {
  block: "center",
  inline: "center"
}

export interface TourProps
  extends Pick<TriggerProps, 'onPopupAlign'> {
  steps?: TourStepInfo[];
  open?: boolean;
  defaultCurrent?: number;
  current?: number;
  onChange?: (current: number) => void;
  onClose?: (current: number) => void;
  onFinish?: () => void;
  closeIcon?: TourStepProps['closeIcon'];
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
  getPopupContainer?: TriggerProps['getPopupContainer'];
  builtinPlacements?: TriggerProps['builtinPlacements'] | ((config?: { arrowPointAtCenter?: boolean }) => TriggerProps['builtinPlacements']);
  disabledInteraction?: boolean;
}

const Tour: React.FC<TourProps> = props => {
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
    scrollIntoViewOptions = defaultScrollIntoViewOptions,
    zIndex = 1001,
    closeIcon,
    builtinPlacements,
    disabledInteraction,
    ...restProps
  } = props;

  const triggerRef = React.useRef<TriggerRef>();

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
    scrollIntoViewOptions: stepScrollIntoViewOptions = defaultScrollIntoViewOptions,
    closeIcon: stepCloseIcon,
  } = steps[mergedCurrent] || {};

  const mergedMask = mergedOpen && (stepMask ?? mask);
  const mergedCloseIcon = stepCloseIcon ?? closeIcon;
  const mergedScrollIntoViewOptions =
    stepScrollIntoViewOptions ?? scrollIntoViewOptions;
  const [posInfo, targetElement] = useTarget(
    target,
    open,
    gap,
    mergedScrollIntoViewOptions,
  );
  const mergedPlacement = getPlacement(targetElement, placement, stepPlacement);

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

  const mergedBuiltinPlacements = useMemo(() => {
    if (builtinPlacements) {
      return typeof builtinPlacements === 'function' ? builtinPlacements({arrowPointAtCenter}) : builtinPlacements;
    }
    return getPlacements(arrowPointAtCenter);
  }, [builtinPlacements, arrowPointAtCenter])

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
      closeIcon={mergedCloseIcon}
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
        disabledInteraction={disabledInteraction}
      />
      <Trigger
        {...restProps}
        builtinPlacements={mergedBuiltinPlacements}
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
