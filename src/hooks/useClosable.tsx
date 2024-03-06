import * as React from 'react';
import { useMemo } from 'react';
import type { TourProps } from '../interface';
import type { TourStepInfo } from '../TourStep';

type ClosableConfig = Exclude<TourStepInfo['closable'], boolean> | null;

function isConfigObj(
  closable: TourStepInfo['closable'],
): closable is Exclude<TourStepInfo['closable'], boolean> {
  return closable !== null && typeof closable === 'object';
}

function getClosableConfig(
  prefixCls: string,
  closable: TourStepInfo['closable'],
  closeIcon: TourStepInfo['closeIcon'],
  preset: true,
): ClosableConfig;
function getClosableConfig(
  prefixCls: string,
  closable: TourStepInfo['closable'],
  closeIcon: TourStepInfo['closeIcon'],
  preset: false,
): ClosableConfig | 'empty';
/**
 * Convert `closable` to ClosableConfig.
 * When `preset` is true, will auto fill ClosableConfig with default value.
 */
function getClosableConfig(
  prefixCls: string,
  closable: TourStepInfo['closable'],
  closeIcon: TourStepInfo['closeIcon'],
  preset: boolean,
): ClosableConfig | 'empty' {
  if (
    closable === false ||
    (closeIcon === false && (!isConfigObj(closable) || !closable.closeIcon))
  ) {
    return null;
  }

  const defaultIcon = <span className={`${prefixCls}-close-x`}>&times;</span>;
  const mergedCloseIcon =
    (typeof closeIcon !== 'boolean' && closeIcon) || defaultIcon;

  if (isConfigObj(closable)) {
    return {
      ...closable,
      closeIcon: closable.closeIcon || mergedCloseIcon,
    };
  }

  // When StepClosable no need auto fill, but RootClosable need this.
  return preset || closable || closeIcon
    ? {
        closeIcon: mergedCloseIcon,
      }
    : 'empty';
}

export function useClosable(
  prefixCls: string,
  stepClosable: TourStepInfo['closable'],
  stepCloseIcon: TourStepInfo['closeIcon'],
  closable: TourProps['closable'],
  closeIcon: TourProps['closeIcon'],
) {
  return useMemo(() => {
    const stepClosableConfig = getClosableConfig(
      prefixCls,
      stepClosable,
      stepCloseIcon,
      false,
    );

    const rootClosableConfig = getClosableConfig(
      prefixCls,
      closable,
      closeIcon,
      true,
    );

    if (stepClosableConfig !== 'empty') {
      return stepClosableConfig;
    }

    return rootClosableConfig;
  }, [closable, closeIcon, prefixCls, stepClosable, stepCloseIcon]);
}
