import * as React from 'react';
import type { ReactNode, CSSProperties } from 'react';
import type { PlacementType } from '../placements';
import DefaultPanel from './DefaultPanel';
import type { TourStepProps, TourStepInfo } from '../interface';

export type {
  TourStepProps,
  TourStepInfo,
};

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
