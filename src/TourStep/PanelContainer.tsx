import * as React from 'react';
import type { TourStepProps } from '.';
import classNames from 'classnames';

interface PanelContainerProps extends TourStepProps{
  children?: React.ReactNode,
  popupClassName?: string;
}

export default function PanelContainer(props: PanelContainerProps) {
  const {
    prefixCls,
    arrow,
    className,
    children,
    popupClassName
  } = props;

  return (
    <div className={classNames(`${prefixCls}-content`, className, popupClassName)}>
      {arrow && <div className={`${prefixCls}-arrow`} key="arrow" />}
      <div className={`${prefixCls}-inner`}>
        {
          React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
              return null
            }
            return React.cloneElement(child, props)
          })
        }
      </div>
    </div>
  );
}
