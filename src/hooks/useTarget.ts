import { useReducer, useState } from 'react';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import { isInViewPort } from '../util';
// import placements from '../placements';
import type { TourStepProps } from '..';
export function useForceUpdate() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  return forceUpdate;
}

export interface PosInfo {
  left: number;
  top: number;
  height: number;
  width: number;
}

export default function useTarget(
  target: TourStepProps['target'],
): [PosInfo, HTMLElement] {
  // ========================= Target =========================
  // We trade `undefined` as not get target by function yet.
  // `null` as empty target.
  const [targetElement, setTargetElement] = useState<
    null | HTMLElement | undefined
  >(undefined);

  useLayoutEffect(() => {
    const nextElement = typeof target === 'function' ? target() : target;
    setTargetElement(nextElement || null);
  });

  // ========================= Align ==========================
  const [posInfo, setPosInfo] = useState<PosInfo>(null);

  useLayoutEffect(() => {
    if (targetElement) {
      // Exist target element. We should scroll and get target position
      if (!isInViewPort(targetElement)) {
        targetElement.scrollIntoView(true);
      }

      const { left, top, width, height } =
        targetElement.getBoundingClientRect();
      const nextPosInfo: PosInfo = { left, top, width, height };

      setPosInfo(origin => {
        if (JSON.stringify(origin) !== JSON.stringify(nextPosInfo)) {
          return nextPosInfo;
        }

        return origin;
      });
    } else {
      // Not exist target which means we just show in center
      setPosInfo(null);
    }
  }, [targetElement]);

  return [posInfo, targetElement];
}
