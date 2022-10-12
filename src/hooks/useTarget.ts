import { useState, useMemo } from 'react';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import { isInViewPort } from '../util';
import type { TourStepInfo } from '..';

export interface Gap {
  offset?: number;
  radius?: number;
}

export interface PosInfo {
  left: number;
  top: number;
  height: number;
  width: number;
  radius: number;
}

export default function useTarget(
  target: TourStepInfo['target'],
  gap?: Gap,
): [PosInfo, HTMLElement] {
  // ========================= Target =========================
  // We trade `undefined` as not get target by function yet.
  // `null` as empty target.
  const [targetElement, setTargetElement] = useState<
    null | HTMLElement | undefined
  >(undefined);

  useLayoutEffect(() => {
    const nextElement =
      typeof target === 'function' ? (target as any)() : target;
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
      const nextPosInfo: PosInfo = { left, top, width, height, radius: 0 };

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

  // ======================== PosInfo =========================
  const mergedPosInfo = useMemo(() => {
    if (!posInfo) {
      return posInfo;
    }

    const gapOffset = gap?.offset || 6;
    const gapRadius = gap?.radius || 2;

    return {
      left: posInfo.left - gapOffset,
      top: posInfo.top - gapOffset,
      width: posInfo.width + gapOffset * 2,
      height: posInfo.height + gapOffset * 2,
      radius: gapRadius,
    };
  }, [posInfo, gap]);

  return [mergedPosInfo, targetElement];
}
