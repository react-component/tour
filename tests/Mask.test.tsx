import { render } from '@testing-library/react';
import React from 'react';
import Mask from '../src/Mask';
import type { PosInfo } from '../src/hooks/useTarget';

const renderMask = (pos: PosInfo, style?: React.CSSProperties) =>
  render(<Mask open pos={pos} prefixCls="rc-tour" showMask style={style} />);

const getMaskElements = () => {
  const svg = document.querySelector('.rc-tour-mask svg');
  const [, top, left, bottom, right] = Array.from(
    svg.querySelectorAll(':scope > rect'),
  );

  return { svg, top, left, bottom, right };
};

describe('Mask', () => {
  it('keeps the normal click-blocking geometry inside the mask', () => {
    renderMask({ left: 100, top: 50, width: 200, height: 100, radius: 2 });

    const { svg, top, left, bottom, right } = getMaskElements();

    expect(svg).toHaveStyle({ overflow: 'hidden' });
    expect(top).toHaveAttribute('width', '100%');
    expect(top).toHaveAttribute('height', '50');
    expect(left).toHaveAttribute('width', '100');
    expect(left).toHaveAttribute('height', '100%');
    expect(bottom).toHaveAttribute('y', '150');
    expect(bottom).toHaveAttribute('height', '100%');
    expect(right).toHaveAttribute('x', '300');
    expect(right).toHaveAttribute('width', '100%');

    [top, left, bottom, right].forEach(rect => {
      expect(rect).toHaveAttribute('fill', 'transparent');
      expect(rect).toHaveAttribute('pointer-events', 'auto');
    });
  });

  it('does not create negative dimensions when a gap crosses the viewport edges', () => {
    const maskSize = { width: 800, height: 600 };
    const pos = { left: 780, top: 580, width: 40, height: 40, radius: 2 };

    renderMask(pos, {
      ...maskSize,
      right: 'auto',
      bottom: 'auto',
    });

    const { bottom, right } = getMaskElements();
    const mask = document.querySelector('.rc-tour-mask');

    expect(mask).toHaveStyle({ width: '800px', height: '600px' });
    expect(pos.top + pos.height).toBeGreaterThan(maskSize.height);
    expect(pos.left + pos.width).toBeGreaterThan(maskSize.width);
    expect(bottom).toHaveAttribute('y', '620');
    expect(bottom).toHaveAttribute('height', '100%');
    expect(right).toHaveAttribute('x', '820');
    expect(right).toHaveAttribute('width', '100%');
  });

  it('clamps click blockers when the target is above or left of the mask', () => {
    renderMask({ left: -20, top: -20, width: 10, height: 10, radius: 2 });

    const { top, left, bottom, right } = getMaskElements();

    expect(top).toHaveAttribute('height', '0');
    expect(left).toHaveAttribute('width', '0');
    expect(bottom).toHaveAttribute('y', '0');
    expect(bottom).toHaveAttribute('height', '100%');
    expect(right).toHaveAttribute('x', '0');
    expect(right).toHaveAttribute('width', '100%');
  });
});
