import { useMemo, type ReactNode } from 'react';
import type { TourProps } from '../interface';
import type { TourStepInfo, TourStepProps } from '../TourStep';

function getClosableObj(
  closable: TourStepInfo['closable'],
  closeIcon: TourStepInfo['closeIcon'],
) {
  // closable is non-null object
  if (typeof closable === 'object' && closable !== null) {
    return closable;
  }
  // closable is true
  if (closable === true) {
    return {
      closeIcon,
    };
  }
  // closable is false
  if (closable === false) {
    return null;
  }
  // closable is undefined
  return undefined;
}

function getMergedCloseIcon(
  icon: TourStepProps['closeIcon'],
  defaultCloseIcon: ReactNode,
) {
  if (typeof icon === 'boolean') {
    return icon ? defaultCloseIcon : null;
  }
  if (icon !== undefined) {
    return icon;
  }
}

export function useClosable(
  prefixCls: string,
  stepClosable: TourStepInfo['closable'],
  stepCloseIcon: TourStepInfo['closeIcon'],
  closable: TourProps['closable'],
  closeIcon: TourProps['closeIcon'],
) {
  const defaultCloseIcon = (
    <span className={`${prefixCls}-close-x`}>&times;</span>
  );

  const mergedCloseIcon = useMemo(() => {
    // stepCloseIcon has higher priority
    let res = getMergedCloseIcon(stepCloseIcon, defaultCloseIcon);
    if (res !== undefined) {
      return res;
    }
    // if stepCloseIcon is undefined, use closeIcon
    res = getMergedCloseIcon(closeIcon, defaultCloseIcon);
    if (res !== undefined) {
      return res;
    }
    // if closeIcon is undefined, use defaultCloseIcon
    return defaultCloseIcon;
  }, [closeIcon, stepCloseIcon, prefixCls]);

  const mergedClosable = useMemo(() => {
    // When stepClosable and closable are both undefined, use mergedCloseIcon
    if (stepClosable === undefined && closable === undefined) {
      // should not render close button when stepCloseIconn or closeIcon is false explicitly
      const isHideClose =
        stepCloseIcon !== undefined
          ? stepCloseIcon === false
          : closeIcon === false;
      return isHideClose
        ? null
        : {
            closeIcon: mergedCloseIcon,
          };
    }
    // stepClosable has higher priority
    let closableObj = getClosableObj(stepClosable, mergedCloseIcon);
    // if stepClosable is undefined, use closable
    if (closableObj === undefined) {
      closableObj = getClosableObj(closable, mergedCloseIcon);
    }
    // if closable is undefined, should not render close button.
    return closableObj === undefined ? null : closableObj;
  }, [
    closable,
    stepClosable,
    mergedCloseIcon,
    prefixCls,
    stepCloseIcon,
    closeIcon,
  ]);

  return mergedClosable;
}
