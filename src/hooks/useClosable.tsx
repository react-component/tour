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
  // closable is undefined，return false to downgrading
  return false;
}

function getMergedCloseIcon(
  icon: TourStepProps['closeIcon'],
  defaultCloseIcon: ReactNode,
) {
  // if icon is true, use defaultCloseIcon, else use null
  if (typeof icon === 'boolean') {
    return icon ? defaultCloseIcon : null;
  }
  // if icon is not undefined, use icon
  if (icon !== undefined) {
    return icon;
  }
  // icon is undefined，return false to downgrading
  return false;
}

export function useClosable(
  prefixCls: string,
  stepClosable: TourStepInfo['closable'],
  stepCloseIcon: TourStepInfo['closeIcon'],
  closable: TourProps['closable'],
  closeIcon: TourProps['closeIcon'],
) {
  const mergedCloseIcon = useMemo(() => {
    const defaultCloseIcon = (
      <span className={`${prefixCls}-close-x`}>&times;</span>
    );
    // stepCloseIcon has higher priority
    let res = getMergedCloseIcon(stepCloseIcon, defaultCloseIcon);
    if (res !== false) {
      return res;
    }
    // if stepCloseIcon is false, use closeIcon
    res = getMergedCloseIcon(closeIcon, defaultCloseIcon);
    if (res !== false) {
      return res;
    }
    // if closeIcon is false, use defaultCloseIcon
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
    // if stepClosable is false, use closable
    if (closableObj === false) {
      closableObj = getClosableObj(closable, mergedCloseIcon);
    }
    // if closable is false, should not render close button.
    return closableObj === false ? null : closableObj;
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
