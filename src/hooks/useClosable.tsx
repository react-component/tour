import * as React from 'react';
import type { TourProps } from '../interface';
import type { TourStepInfo } from '../TourStep';

type ClosableConfig = Exclude<TourStepInfo['closable'], boolean> | null;

function isConfigObj(
  closable: TourStepInfo['closable'],
): closable is Exclude<TourStepInfo['closable'], boolean> {
  return closable !== null && typeof closable === 'object';
}

function getClosableConfig(
  closable: TourStepInfo['closable'],
  closeIcon: TourStepInfo['closeIcon'],
  preset: true,
): ClosableConfig;
function getClosableConfig(
  closable: TourStepInfo['closable'],
  closeIcon: TourStepInfo['closeIcon'],
  preset: false,
): ClosableConfig | 'empty';
/**
 * Convert `closable` to ClosableConfig.
 * When `preset` is true, will auto fill ClosableConfig with default value.
 */
function getClosableConfig(
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

  const mergedCloseIcon =
    typeof closeIcon !== 'boolean' ? closeIcon : undefined;

  if (isConfigObj(closable)) {
    return {
      ...closable,
      closeIcon: closable.closeIcon ?? mergedCloseIcon,
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
  stepClosable: TourStepInfo['closable'],
  stepCloseIcon: TourStepInfo['closeIcon'],
  closable: TourProps['closable'],
  closeIcon: TourProps['closeIcon'],
) {
  return React.useMemo(() => {
    const stepClosableConfig = getClosableConfig(
      stepClosable,
      stepCloseIcon,
      false,
    );

    const rootClosableConfig = getClosableConfig(closable, closeIcon, true);

    if (stepClosableConfig !== 'empty') {
      return stepClosableConfig;
    }

    return rootClosableConfig;
  }, [closable, closeIcon, stepClosable, stepCloseIcon]);
}
