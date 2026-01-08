import React from 'react';
import { clsx } from 'clsx';
import Portal from '@rc-component/portal';
import type { PosInfo } from './hooks/useTarget';
import useId from '@rc-component/util/lib/hooks/useId';
import type { SemanticName, TourProps } from './interface';

const COVER_PROPS: React.SVGAttributes<SVGRectElement> = {
  fill: 'transparent',
  pointerEvents: 'auto',
};

export interface MaskProps {
  prefixCls?: string;
  pos: PosInfo; //	获取引导卡片指向的元素
  rootClassName?: string;
  showMask?: boolean;
  style?: React.CSSProperties;
  // to fill mask color, e.g. rgba(80,0,0,0.5)
  fill?: string;
  open?: boolean;
  animated?: boolean | { placeholder: boolean };
  zIndex?: number;
  disabledInteraction?: boolean;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  getPopupContainer?: TourProps['getPopupContainer'];
  onEsc?: (info: { top: boolean; event: KeyboardEvent }) => void;
}

const Mask: React.FC<MaskProps> = props => {
  const {
    prefixCls,
    rootClassName,
    pos,
    showMask,
    style = {},
    fill = 'rgba(0,0,0,0.5)',
    open,
    animated,
    zIndex,
    disabledInteraction,
    styles,
    classNames: tourClassNames,
    getPopupContainer,
    onEsc,
  } = props;

  const id = useId();
  const maskId = `${prefixCls}-mask-${id}`;
  const mergedAnimated =
    typeof animated === 'object' ? animated?.placeholder : animated;

  const isSafari =
    typeof navigator !== 'undefined' &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const maskRectSize = isSafari
    ? { width: '100%', height: '100%' }
    : { width: '100vw', height: '100vh' };

  const inlineMode = getPopupContainer === false;

  return (
    <Portal
      open={open}
      autoLock={!inlineMode}
      getContainer={getPopupContainer as any}
      onEsc={onEsc}
    >
      <div
        className={clsx(
          `${prefixCls}-mask`,
          rootClassName,
          tourClassNames?.mask,
        )}
        style={{
          position: inlineMode ? 'absolute' : 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex,
          pointerEvents: pos && !disabledInteraction ? 'none' : 'auto',
          ...style,
          ...styles?.mask,
        }}
      >
        {showMask ? (
          <svg style={{ width: '100%', height: '100%' }}>
            <defs>
              <mask id={maskId}>
                <rect x="0" y="0" {...maskRectSize} fill="white" />
                {pos && (
                  <rect
                    x={pos.left}
                    y={pos.top}
                    rx={pos.radius}
                    width={pos.width}
                    height={pos.height}
                    fill="black"
                    className={
                      mergedAnimated ? `${prefixCls}-placeholder-animated` : ''
                    }
                  />
                )}
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill={fill}
              mask={`url(#${maskId})`}
            />

            {/* Block click region */}
            {pos && (
              <>
                {/* Top */}

                <rect
                  {...COVER_PROPS}
                  x="0"
                  y="0"
                  width="100%"
                  height={Math.max(pos.top, 0)}
                />
                {/* Left */}
                <rect
                  {...COVER_PROPS}
                  x="0"
                  y="0"
                  width={Math.max(pos.left, 0)}
                  height="100%"
                />
                {/* Bottom */}
                <rect
                  {...COVER_PROPS}
                  x="0"
                  y={pos.top + pos.height}
                  width="100%"
                  height={`calc(100% - ${pos.top + pos.height}px)`}
                />
                {/* Right */}
                <rect
                  {...COVER_PROPS}
                  x={pos.left + pos.width}
                  y="0"
                  width={`calc(100% - ${pos.left + pos.width}px)`}
                  height="100%"
                />
              </>
            )}
          </svg>
        ) : null}
      </div>
    </Portal>
  );
};

export default Mask;
