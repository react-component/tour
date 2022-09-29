import React from 'react';
import { render } from '@testing-library/react';
import Portal, { inlineMock } from '../src';

describe('Test Env', () => {
  it('inlineMock', () => {
    inlineMock(true);

    const { container } = render(
      <>
        Start
        <Portal open>
          <div className="bamboo">Hello World</div>
        </Portal>
        End
      </>,
    );

    expect(container).toMatchSnapshot();
  });
});
