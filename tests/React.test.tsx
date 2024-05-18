import { render } from '@testing-library/react';
import React from 'react';
import Tour from '../src/index';

describe('Tour.React', () => {
  let spy: jest.SpyInstance;

  beforeAll(() => {
    spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    spy.mockRestore();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    spy.mockReset();
  });

  it('not warning', () => {
    const renderDemo = (open: boolean) => (
      <React.StrictMode>
        <Tour
          open={open}
          steps={[
            {
              title: 'Center',
              description: 'Displayed in the center of screen.',
              target: null,
            },
          ]}
        />
      </React.StrictMode>
    );

    const {} = render(renderDemo(false));
    expect(spy).not.toHaveBeenCalled();
  });
});
