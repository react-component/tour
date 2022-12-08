import * as React from 'react';
import type { TourStepProps } from '.';
import classNames from 'classnames';
import DefaultPanel from "./DefaultPanel";

export default function PanelContainer(props: TourStepProps) {
  const {
    prefixCls,
    arrow,
    className,
  } = props;

  return (
    <div className={classNames(`${prefixCls}-content`, className)}>
      {arrow && <div className={`${prefixCls}-arrow`} key="arrow" />}
      <div className={`${prefixCls}-inner`}>
        <DefaultPanel {...props} />
      </div>
    </div>
  );
}
