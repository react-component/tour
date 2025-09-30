import useEvent from '@rc-component/util/lib/hooks/useEvent';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import { useMemo, useState } from 'react';
import type { TourStepInfo } from '..';
import { isInViewPort } from '../util';

export interface Gap {
  offset?: number | [number, number] | [number, number][];
  radius?: number;
}

export interface PosInfo {
  left: number;
  top: number;
  height: number;
  width: number;
  radius: number;
}
const DEFAULT_GAP_OFFSET = 6;

function isValidNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val);
}

export default function useTarget(
  target: TourStepInfo['target'],
  open: boolean,
  gap?: Gap,
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions,
  inlineMode?: boolean,
  placeholderRef?: React.RefObject<HTMLDivElement>,
  current: number = 0,
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
      if (!inlineMode && !isInViewPort(targetElement) && open) {
        targetElement.scrollIntoView(scrollIntoViewOptions);
      }

      const { left, top, width, height } =
        targetElement.getBoundingClientRect();
      const nextPosInfo: PosInfo = { left, top, width, height, radius: 0 };

      // If `inlineMode` we need cut off parent offset
      if (inlineMode) {
        const parentRect =
          placeholderRef.current?.parentElement?.getBoundingClientRect();

        if (parentRect) {
          nextPosInfo.left -= parentRect.left;
          nextPosInfo.top -= parentRect.top;
        }
      }

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

  const getGapOffset = (index: number): number => {
    if (gap?.offset === undefined) return DEFAULT_GAP_OFFSET;
    
    if (typeof gap.offset === 'number') {
      return gap.offset;
    }
    
    if (Array.isArray(gap.offset)) {
      if (typeof gap.offset[0] === 'number') {
        const tuple = gap.offset as [number, number];
        return tuple[index] ?? DEFAULT_GAP_OFFSET;
      }
      if (Array.isArray(gap.offset[0])) {
        const arrayOfTuples = gap.offset as [number, number][];
        const stepIndex = current ?? 0;
        return arrayOfTuples[stepIndex]?.[index] ?? DEFAULT_GAP_OFFSET;
      }
    }
    
    return DEFAULT_GAP_OFFSET;
  };

  useLayoutEffect(() => {
    updatePos();
    // update when window resize
    window.addEventListener('resize', updatePos);
    // update when `document.body.style.overflow` is set to visible
    // by default, it will be set to hidden
    window.addEventListener('scroll', updatePos);
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos);
    };
  }, [targetElement, open, updatePos]);

  // ======================== PosInfo =========================
  const mergedPosInfo = useMemo(() => {
    if (!posInfo) {
      return posInfo;
    }

    const gapOffsetX = getGapOffset(0);
    const gapOffsetY = getGapOffset(1);
    const gapRadius = isValidNumber(gap?.radius) ? gap?.radius : 2;

    return {
      left: posInfo.left - gapOffsetX,
      top: posInfo.top - gapOffsetY,
      width: posInfo.width + gapOffsetX * 2,
      height: posInfo.height + gapOffsetY * 2,
      radius: gapRadius,
    };
  }, [posInfo, gap, current]);

  return [mergedPosInfo, targetElement];
}
