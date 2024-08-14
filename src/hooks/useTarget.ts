import useEvent from 'rc-util/lib/hooks/useEvent';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import { useMemo, useState } from 'react';
import type { TourStepInfo } from '..';
import { isInViewPort } from '../util';

export interface Gap {
  offset?: number | [number, number];
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
  open: boolean,
  gap?: Gap,
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions,
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

  const updatePos = useEvent(() => {
    if (targetElement) {
      // Exist target element. We should scroll and get target position
      if (!isInViewPort(targetElement) && open) {
        targetElement.scrollIntoView(scrollIntoViewOptions);
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
  });

  const getGapOffset = (index: number) =>
    (Array.isArray(gap?.offset) ? gap?.offset[index] : gap?.offset) ?? 6;

  useLayoutEffect(() => {
    updatePos();
    // update when window resize
    window.addEventListener('resize', updatePos);
    return () => {
      window.removeEventListener('resize', updatePos);
    };
  }, [targetElement, open, updatePos]);

  const getBodyDomTransformScaleVal = () => {
    const body = document.body;
    const style = window.getComputedStyle(body);
    const transform = style.getPropertyValue('transform');
    const transformOrigin = style.getPropertyValue('transform-origin');
    let scale = 1;
    if (transform && transform !== 'none' && transformOrigin === '0px 0px') {
        const values = transform.split('(')[1].split(')')[0].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        scale = Math.sqrt(a * a + b * b);
    }

    return scale;
  }

  // ======================== PosInfo =========================
  const mergedPosInfo = useMemo(() => {
    if (!posInfo) {
      return posInfo;
    }

    const gapOffsetX = getGapOffset(0);
    const gapOffsetY = getGapOffset(1);
    const gapRadius = gap?.radius || 2;

    const bodyScaleRadio = getBodyDomTransformScaleVal();

    return {
      left: (posInfo.left - gapOffsetX) / bodyScaleRadio,
      top: (posInfo.top - gapOffsetY) / bodyScaleRadio,
      width: (posInfo.width + gapOffsetX * 2) / bodyScaleRadio,
      height: (posInfo.height + gapOffsetY * 2) / bodyScaleRadio,
      radius: gapRadius / bodyScaleRadio,
    };
  }, [posInfo, gap]);

  return [mergedPosInfo, targetElement];
}
