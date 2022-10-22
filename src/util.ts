// =============================== Motion ===============================
export function getMotionName(
  prefixCls: string,
  transitionName?: string,
  animationName?: string,
) {
  let motionName = transitionName;
  if (!motionName && animationName) {
    motionName = `${prefixCls}-${animationName}`;
  }
  return motionName;
}

// ================================ UUID ================================
let uuid = -1;
export function getUUID() {
  uuid += 1;
  return uuid;
}

// =============================== getScroll ===============================
export function isWindow(obj: any): obj is Window {
  return obj !== null && obj !== undefined && obj === obj.window;
}

export function getScroll(
  target: HTMLElement | Window | Document | null,
  top?: boolean,
): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  const method = top ? 'scrollTop' : 'scrollLeft';
  let result = 0;
  if (isWindow(target)) {
    result = target[top ? 'pageYOffset' : 'pageXOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target instanceof HTMLElement) {
    result = target[method];
  } else if (target) {
    // According to the type inference, the `target` is `never` type.
    // Since we configured the loose mode type checking, and supports mocking the target with such shape below::
    //    `{ documentElement: { scrollLeft: 200, scrollTop: 400 } }`,
    //    the program may falls into this branch.
    // Check the corresponding tests for details. Don't sure what is the real scenario this happens.
    result = target[method];
  }

  if (
    target &&
    !isWindow(target) &&
    typeof result !== 'number' &&
    !(target instanceof HTMLElement)
  ) {
    result = (target.ownerDocument ?? target).documentElement?.[method];
  }
  return result;
}

export function isInViewPort(element: HTMLElement) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const { top, right, bottom, left } = element.getBoundingClientRect();

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
