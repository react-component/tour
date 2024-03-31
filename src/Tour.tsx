import * as React from 'react';

import Portal from '@rc-component/portal';
import type { TriggerRef } from '@rc-component/trigger';
import Trigger from '@rc-component/trigger';
import classNames from 'classnames';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { useMemo } from 'react';
import { useClosable } from './hooks/useClosable';
import useTarget from './hooks/useTarget';
import type { TourProps } from './interface';
import Mask from './Mask';
import { getPlacements } from './placements';
import TourStep from './TourStep';
import { getPlacement } from './util';

const CENTER_PLACEHOLDER: React.CSSProperties = {
  left: '50%',
  top: '50%',
  width: 1,
  height: 1,
};
const defaultScrollIntoViewOptions: ScrollIntoViewOptions = {
  block: 'center',
  inline: 'center',
};

export type { TourProps };

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
    prompt= false,
    rootClassName,
    placement,
    renderPanel,
    gap,
    animated,
    scrollIntoViewOptions = defaultScrollIntoViewOptions,
    zIndex = 1001,
    closeIcon,
    closable,
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
    scrollIntoViewOptions:
      stepScrollIntoViewOptions = defaultScrollIntoViewOptions,
    closeIcon: stepCloseIcon,
    closable: stepClosable,
  } = steps[mergedCurrent] || {};

  const mergedClosable = useClosable(
    stepClosable,
    stepCloseIcon,
    closable,
    closeIcon,
  );

  const mergedMask = mergedOpen && (stepMask ?? mask);
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
      return typeof builtinPlacements === 'function'
        ? builtinPlacements({ arrowPointAtCenter })
        : builtinPlacements;
    }
    return getPlacements(arrowPointAtCenter);
  }, [builtinPlacements, arrowPointAtCenter]);

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
      onNoPrompt={() => {
        handleClose();
        onFinish?.();
      }}
      {...steps[mergedCurrent]}
      closable={mergedClosable}
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
