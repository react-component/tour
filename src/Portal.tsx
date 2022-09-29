import * as React from 'react';
import { createPortal } from 'react-dom';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import OrderContext from './Context';
import useDom from './useDom';
import useScrollLocker from './useScrollLocker';
import { inlineMock } from './mock';

export type ContainerType = Element | DocumentFragment;

export type GetContainer =
  | string
  | ContainerType
  | (() => ContainerType)
  | false;

export interface PortalProps {
  /** Customize container element. Default will create a div in document.body when `open` */
  getContainer?: GetContainer;
  children?: React.ReactNode;
  /** Show the portal children */
  open?: boolean;
  /** Remove `children` when `open` is `false`. Set `false` will not handle remove process */
  autoDestroy?: boolean;
  /** Lock screen scroll when open */
  autoLock?: boolean;

  /** @private debug name. Do not use in prod */
  debug?: string;
}

const getPortalContainer = (getContainer: GetContainer) => {
  if (getContainer === false) {
    return false;
  }

  if (!canUseDom() || !getContainer) {
    return null;
  }

  if (typeof getContainer === 'string') {
    return document.querySelector(getContainer);
  }
  if (typeof getContainer === 'function') {
    return getContainer();
  }
  return getContainer;
};

export default function Portal(props: PortalProps) {
  const {
    open,
    autoLock,
    getContainer,
    debug,
    autoDestroy = true,
    children,
  } = props;

  const [mergedRender, setMergedRender] = React.useState(open);

  useScrollLocker(autoLock && open);

  // ====================== Should Render ======================
  React.useEffect(() => {
    if (autoDestroy || open) {
      setMergedRender(open);
    }
  }, [open, autoDestroy]);

  // ======================== Container ========================
  const [innerContainer, setInnerContainer] = React.useState<
    ContainerType | false
  >(() => getPortalContainer(getContainer));

  React.useEffect(() => {
    const customizeContainer = getPortalContainer(getContainer);

    // Tell component that we check this in effect which is safe to be `null`
    setInnerContainer(customizeContainer ?? null);
  });

  const [defaultContainer, queueCreate] = useDom(
    mergedRender && !innerContainer,
    debug,
  );
  const mergedContainer = innerContainer ?? defaultContainer;

  // ========================= Render ==========================
  // Do not render when nothing need render
  // When innerContainer is `undefined`, it may not ready since user use ref in the same render
  if (!mergedRender || !canUseDom() || innerContainer === undefined) {
    return null;
  }

  // Render inline
  const renderInline = mergedContainer === false || inlineMock();

  return (
    <OrderContext.Provider value={queueCreate}>
      {renderInline ? children : createPortal(children, mergedContainer)}
    </OrderContext.Provider>
  );
}
