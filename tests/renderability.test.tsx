import React from 'react';
import { render } from '@testing-library/react';
import Tour from '../src';

it('uses the zero step icon instead of the root icon', () => {
  const { baseElement } = render(
    <Tour open closeIcon="ROOT" steps={[{ title: 'Step', closeIcon: 0 }]} />,
  );
  expect(baseElement.querySelector('.rc-tour-close').textContent).toBe('0');
});

it('lets a configured zero icon override closeIcon=false', () => {
  const { baseElement } = render(
    <Tour
      open
      steps={[{ title: 'Step', closeIcon: false, closable: { closeIcon: 0 } }]}
    />,
  );
  expect(baseElement.querySelector('.rc-tour-close').textContent).toBe('0');
});

it('preserves closable=false even with a zero icon', () => {
  const { baseElement } = render(
    <Tour open steps={[{ title: 'Step', closable: false, closeIcon: 0 }]} />,
  );
  expect(baseElement.querySelector('.rc-tour-close')).toBeNull();
});
