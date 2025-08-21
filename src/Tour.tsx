import * as React from 'react';

import Portal from '@rc-component/portal';
import type { TriggerRef } from '@rc-component/trigger';
import Trigger from '@rc-component/trigger';
import classNames from 'classnames';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import useMergedState from '@rc-component/util/lib/hooks/useMergedState';
import { useMemo } from 'react';
import { useClosable } from './hooks/useClosable';
import useTarget from './hooks/useTarget';
import type { TourProps } from './interface';
import Mask from './Mask';
import { getPlacements } from './placements';
import TourStep from './TourStep';
import { getPlacement } from './util';
import Placeholder from './Placeholder';

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
    defaultOpen,
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
    closable,
    builtinPlacements,
    disabledInteraction,
    styles,
    classNames: tourClassNames,
    className,
    style,
    getPopupContainer,
    ...restProps
  } = props;

  const triggerRef = React.useRef<TriggerRef>();

  const [mergedCurrent, setMergedCurrent] = useMergedState(0, {
    value: current,
    defaultValue: defaultCurrent,
  });

  const [mergedOpen, setMergedOpen] = useMergedState(defaultOpen, {
    value: open,
    postState: origin =>
      mergedCurrent < 0 || mergedCurrent >= steps.length
        ? false
        : (origin ?? true),
  });

  // ========================= Change =========================
  const onInternalChange = (nextCurrent: number) => {
    setMergedCurrent(nextCurrent);
    onChange?.(nextCurrent);
  };

  const handleClose = () => {
    setMergedOpen(false);
    onClose?.(mergedCurrent);
  };

  const handlePrev = () => {
    onInternalChange(mergedCurrent - 1);
  };
  const handleNext = () => {
    onInternalChange(mergedCurrent + 1);
  };
  const handleFinish = () => {
    handleClose();
    onFinish?.();
  };

  // Record if already rended in the DOM to avoid `findDOMNode` issue
  const [hasOpened, setHasOpened] = React.useState(mergedOpen);

  const openRef = React.useRef(mergedOpen);

  useLayoutEffect(() => {
    if (mergedOpen) {
      if (!openRef.current) {
        setMergedCurrent(0);
      }

      setHasOpened(true);
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

  // ====================== Align Target ======================
  const placeholderRef = React.useRef<HTMLDivElement>(null);

  const inlineMode = getPopupContainer === false;

  const [posInfo, targetElement] = useTarget(
    target,
    open,
    gap,
    mergedScrollIntoViewOptions,
    inlineMode,
    placeholderRef,
    mergedCurrent,
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
  if (targetElement === undefined || !hasOpened) {
    return null;
  }


  const getPopupElement = () => (
    <TourStep
      styles={styles}
      classNames={tourClassNames}
      arrow={mergedArrow}
      key="content"
      prefixCls={prefixCls}
      total={steps.length}
      renderPanel={renderPanel}
      onPrev={handlePrev}
      onNext={handleNext}
      onClose={handleClose}
      current={mergedCurrent}
      onFinish={handleFinish}
      {...steps[mergedCurrent]}
      closable={mergedClosable}
    />
  );

  const mergedShowMask =
    typeof mergedMask === 'boolean' ? mergedMask : !!mergedMask;
  const mergedMaskStyle =
    typeof mergedMask === 'boolean' ? undefined : mergedMask;

  // when targetElement is not exist, use body as triggerDOMNode
  const fallbackDOM = () => {
    return targetElement || document.body;
  };

  return (
    <>
      <Mask
        getPopupContainer={getPopupContainer}
        styles={styles}
        classNames={tourClassNames}
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
        // `rc-portal` def bug not support `false` but does support and in used.
        getPopupContainer={getPopupContainer as any}
        builtinPlacements={mergedBuiltinPlacements}
        ref={triggerRef}
        popupStyle={stepStyle}
        popupPlacement={mergedPlacement}
        popupVisible={mergedOpen}
        popupClassName={classNames(rootClassName, stepClassName)}
        prefixCls={prefixCls}
        popup={getPopupElement}
        forceRender={false}
        autoDestroy
        zIndex={zIndex}
        arrow={!!mergedArrow}
      >
        <Placeholder
          open={mergedOpen}
          autoLock={!inlineMode}
          getContainer={getPopupContainer as any}
          domRef={placeholderRef}
          fallbackDOM={fallbackDOM}
          className={classNames(
            className,
            rootClassName,
            `${prefixCls}-target-placeholder`,
          )}
          style={{
            ...(posInfo || CENTER_PLACEHOLDER),
            position: inlineMode ? 'absolute' : 'fixed',
            pointerEvents: 'none',
            ...style,
          }}
        />
      </Trigger>
    </>
  );
};

export default Tour;
