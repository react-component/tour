import * as React from 'react';
import type { ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import type { PlacementType } from '../placements';
import DefaultPanel from './DefaultPanel';

export interface TourStepInfo {
  arrow?: boolean | { pointAtCenter: boolean };
  target?: HTMLElement | (() => HTMLElement) | null |(() => null);
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
  type?: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
}

const TourStep = (props: TourStepProps) => {
  const { className, prefixCls, current, renderPanel } = props;

  const mergedClassName = classNames(`${prefixCls}-inner`, className);

  return (
    <div className={mergedClassName}>
      {typeof renderPanel === 'function' ? (
        renderPanel(props, current)
      ) : (
        <DefaultPanel {...props} />
      )}
    </div>
  );
};

export default TourStep;
