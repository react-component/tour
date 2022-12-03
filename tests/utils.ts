export const waitForComponentToPaint = async (wrapper: any, time = 50) => {
  wrapper.update?.();
  await new Promise(resolve => setTimeout(resolve, time));
  wrapper.update?.();
};

export const triggerResize = (target: Element, rect: Partial<DOMRect>) => {
  const originGetBoundingClientRect = target.getBoundingClientRect;

  target.getBoundingClientRect = () => rect as DOMRect;

  target.getBoundingClientRect = originGetBoundingClientRect;
};
