import * as React from 'react';
import type { ReactNode, CSSProperties } from 'react';
import type { PlacementType } from '../placements';
import DefaultPanel from './DefaultPanel';

export interface TourStepInfo {
  arrow?: boolean | { pointAtCenter: boolean };
  target?: HTMLElement | (() => HTMLElement) | null | (() => null);
  title: ReactNode;
  description?: ReactNode;
  placement?: PlacementType;
  mask?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface TourStepProps extends TourStepInfo {
  prefixCls?: string;
  total?: number;
  current?: number;
  onClose?: () => void;
  onFinish?: () => void;
  renderPanel?: (step: TourStepProps, current: number) => ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
}

const TourStep = (props: TourStepProps) => {
  const { current, renderPanel } = props;

  return (
    <>
      {typeof renderPanel === 'function' ? (
        renderPanel(props, current)
      ) : (
        <DefaultPanel {...props} />
      )}
    </>
  );
};

export default TourStep;
