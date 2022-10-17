import React from 'react';
import { render } from '@testing-library/react';
import Tour from '../src';

describe('Test Env', () => {
  it('inlineMock', () => {
    const { container } = render(
      <>
        Start
        <Tour steps={[]} open={false} current={0} />
        End
      </>,
    );

    expect(container).toMatchSnapshot();
  });
});
