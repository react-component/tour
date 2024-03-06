import * as React from 'react';
import DefaultPanel, { DefaultPanelProps } from './DefaultPanel';
import type { TourStepProps, TourStepInfo } from '../interface';

export type {
  TourStepProps,
  TourStepInfo,
};

const TourStep = (props: DefaultPanelProps) => {
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
