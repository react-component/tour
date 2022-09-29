import React from 'react';
import { renderToString } from 'react-dom/server';
import Portal from '../src';

describe('SSR', () => {
  it('No Render in SSR', () => {
    renderToString(
      <Portal open>
        <div className="bamboo">Hello World</div>
      </Portal>,
    );
  });
});
