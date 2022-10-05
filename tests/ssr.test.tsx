import React from 'react';
import { renderToString } from 'react-dom/server';
import Tour from '../src';

describe('SSR', () => {
  it('No Render in SSR', () => {
    renderToString(<Tour steps={[]} open={false} current={0} />);
  });
});
