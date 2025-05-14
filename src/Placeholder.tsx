import Portal, { type PortalProps } from '@rc-component/portal';
import * as React from 'react';

export interface PlaceholderProps
  extends Pick<PortalProps, 'open' | 'autoLock' | 'getContainer'> {
  domRef: React.RefObject<HTMLDivElement>;
  className: string;
  style: React.CSSProperties;
  fallbackDOM: () => HTMLElement | null;
}

const Placeholder = React.forwardRef<HTMLElement, PlaceholderProps>(
  (props, ref) => {
    const {
      open,
      autoLock,
      getContainer,
      domRef,
      className,
      style,
      fallbackDOM,
    } = props;

    React.useImperativeHandle(ref, () => domRef.current || fallbackDOM());

    return (
      <Portal open={open} autoLock={autoLock} getContainer={getContainer}>
        <div ref={domRef} className={className} style={style} />
      </Portal>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Placeholder.displayName = 'Placeholder';
}

export default Placeholder;
