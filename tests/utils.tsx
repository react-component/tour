import type { ReactElement } from 'react';
import React, { StrictMode } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render, act } from '@testing-library/react';

export function assertsExist<T>(item: T | null | undefined): asserts item is T {
  expect(item).not.toBeUndefined();
  expect(item).not.toBeNull();
}

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise(resolve => {
      globalTimeout(resolve, timeout);
    });
  });
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: StrictMode, ...options });

export * from '@testing-library/react';

export function renderHook<T>(func: () => T): { result: React.RefObject<T> } {
  const result = React.createRef<T>();

  const Demo = () => {
    (result as any).current = func();

    return null;
  };

  customRender(<Demo />);

  return { result };
}

/**
 * Pure render like `@testing-lib` render which will not wrap with StrictMode.
 *
 * Please only use with render times times of memo usage case.
 */
const pureRender = render;

export { customRender as render, pureRender };

/**
 * Wait for a time delay. Will wait `advanceTime * times` ms.
 *
 * @param advanceTime Default 1000
 * @param times Default 20
 */
export async function waitFakeTimer(advanceTime = 1000, times = 20) {
  for (let i = 0; i < times; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await Promise.resolve();

      if (advanceTime > 0) {
        jest.advanceTimersByTime(advanceTime);
      } else {
        jest.runAllTimers();
      }
    });
  }
}
