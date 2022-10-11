import { useEffect, useReducer, useState } from 'react';
import type { AlignType } from 'rc-trigger/lib/interface';
import { isInViewPort } from './util';
import placements from './placements';
export function useForceUpdate() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  return forceUpdate;
}

export type posType = {
  left: number;
  round: number;
  top: number;
  height: number;
  width: number;
  documentWidth: number;
  documentHeight: number;
};
export function useTarget(
  target,
  placement,
  containerElement,
  mergedOpen,
): [posType, AlignType, boolean] {
  const [pos, setPos] = useState<posType>({
    left: 0,
    round: 0,
    top: 0,
    height: 0,
    width: 0,
    documentWidth: 0,
    documentHeight: 0,
  });
  const [hasTarget, setHasTarget] = useState(true);
  const [popupAlign, setPopupAlign] = useState(placements[placement]);
  const documentWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  const documentHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  useEffect(() => {
    const targetElement = typeof target === 'function' ? target() : target;
    if (targetElement) {
      console.log('find');
      if (!isInViewPort(targetElement)) {
        targetElement.scrollIntoView(true);
      }
      const { left, top } = targetElement.getBoundingClientRect();
      const { offsetWidth, offsetHeight, style } = targetElement || {};
      const { borderRadius = 0 } = style;
      setPos({
        left,
        top,
        height: offsetHeight,
        width: offsetWidth,
        round: borderRadius,
        documentWidth,
        documentHeight,
      });
    } else if (mergedOpen) {
      setHasTarget(false);
      setPopupAlign({
        ...popupAlign,
        points: ['cc', 'cc'],
        offset: [0, documentHeight / 2],
      });
    }
  }, [target, containerElement]);
  return [pos, popupAlign, hasTarget];
}
