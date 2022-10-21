import React, { useState, useRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Tour from '../src/index';
import placements from '../src/placements';
import type { PlacementType } from '../src/placements';

function doAsync(cb) {
  setTimeout(() => {
    cb();
  }, 1000);
}

window.requestAnimationFrame = window.setTimeout;
window.cancelAnimationFrame = window.clearTimeout;

describe('Tour', () => {
  window.requestAnimationFrame = window.setTimeout;
  window.cancelAnimationFrame = window.clearTimeout;
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  it('single', async () => {
    const Demo = () => {
      const btnRef = useRef<HTMLButtonElement>(null);
      return (
        <div style={{ margin: 20 }}>
          <button ref={btnRef}>按钮</button>
          <Tour
            placement={'bottom'}
            steps={[
              {
                title: '创建',
                description: '创建一条数据',
                target: () => btnRef.current,
              },
            ]}
          />
        </div>
      );
    };
    const { getByText, container } = render(<Demo />);
    expect(getByText('创建一条数据')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('basic', () => {
    const Demo = () => {
      const createBtnRef = useRef<HTMLButtonElement>(null);
      const updateBtnRef = useRef<HTMLButtonElement>(null);
      const deleteBtnRef = useRef<HTMLButtonElement>(null);
      return (
        <div style={{ margin: 20 }}>
          <div>
            <button ref={createBtnRef}>Create</button>
            <div style={{ height: 200 }} />
            <button ref={updateBtnRef}>Update</button>
            <button ref={deleteBtnRef}>Delete</button>
          </div>
          <div style={{ height: 200 }} />

          <Tour
            defaultCurrent={1}
            steps={[
              {
                title: '创建',
                description: '创建一条数据',
                target: () => createBtnRef.current,
                mask: true,
              },
              {
                title: '更新',
                description: (
                  <div>
                    <span>更新一条数据</span>
                    <button>帮助文档</button>
                  </div>
                ),
                target: () => updateBtnRef.current,
              },
              {
                title: '删除',
                description: (
                  <div>
                    <span>危险操作:删除一条数据</span>
                    <button>帮助文档</button>
                  </div>
                ),
                target: () => deleteBtnRef.current,
                mask: true,
                style: { color: 'red' },
              },
            ]}
          />
        </div>
      );
    };
    const { getByText } = render(<Demo />);
    expect(getByText('更新一条数据')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '上一步' }));
    expect(getByText('创建一条数据')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '下一步' }));
    expect(getByText('更新一条数据')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '下一步' }));
    expect(getByText('危险操作:删除一条数据')).toBeTruthy();
    expect(document.querySelector('.rc-tour')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '结束引导' }));
    expect(document.querySelector('.rc-tour')).toBeFalsy();
  });

  it('rootClassName', () => {
    const Demo = () => {
      const btnRef = useRef<HTMLButtonElement>(null);
      return (
        <div style={{ margin: 20 }}>
          <button ref={btnRef}>按钮</button>
          <Tour
            placement={'bottom'}
            rootClassName={'customClassName'}
            steps={[
              {
                title: '创建',
                description: '创建一条数据',
                target: () => btnRef.current,
              },
            ]}
          />
        </div>
      );
    };
    const { container } = render(<Demo />);

    doAsync(() => {
      expect(container.querySelector('.rc-tour')).toHaveClass(
        'customClassName',
      );
      expect(container.querySelector('.rc-tour-mask')).toHaveClass(
        'customClassName',
      );
      expect(
        container.querySelector('.rc-tour-target-placeholder'),
      ).toHaveClass('customClassName');
    });
  });

  it('open', () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <div style={{ margin: 20 }}>
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            open
          </button>

          <Tour
            placement={'bottom'}
            open={open}
            steps={[
              {
                title: '创建',
                description: '创建一条数据',
                target: undefined,
              },
            ]}
          />
        </div>
      );
    };

    const { getByText } = render(<Demo />);
    expect(document.querySelector(`.rc-tour`)).toBeFalsy();
    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    expect(document.querySelector(`.rc-tour`)).toBeTruthy();
    expect(getByText('创建一条数据')).toBeTruthy();
  });

  describe('placement', () => {
    it('placements', async () => {
      const Demo = props => {
        const btnRef = useRef<HTMLButtonElement>(null);
        return (
          <div style={{ margin: 20 }}>
            <button ref={btnRef}>按钮</button>
            <Tour
              placement={props.placement}
              steps={[
                {
                  title: '创建',
                  description: '创建一条数据',
                  target: () => btnRef.current,
                },
              ]}
            />
          </div>
        );
      };

      Object.keys(placements).forEach(item => {
        const { unmount } = render(<Demo placement={item} />);
        doAsync(() =>
          expect(
            document.querySelector(`.rc-tour-placement-${item}`),
          ).toBeTruthy(),
        );
        unmount();
      });
    });

    it('change placement', async () => {
      const Demo = () => {
        const [placement, setPlacement] = useState<PlacementType>('left');
        return (
          <div style={{ margin: 20 }}>
            <button
              onClick={() => {
                setPlacement('bottom');
              }}
            >
              bottom
            </button>

            <Tour
              placement={placement}
              steps={[
                {
                  title: '创建',
                  description: '创建一条数据',
                  target: undefined,
                },
              ]}
            />
          </div>
        );
      };

      render(<Demo />);
      doAsync(() =>
        expect(document.querySelector(`.rc-tour-placement-left`)).toBeTruthy(),
      );

      fireEvent.click(screen.getByRole('button', { name: 'bottom' }));
      doAsync(() =>
        expect(
          document.querySelector(`.rc-tour-placement-bottom`),
        ).toBeTruthy(),
      );
    });
  });

  describe('showArrow', () => {
    it('should show tooltip arrow default', () => {
      let arrow = true;
      const Demo = () => {
        const btnRef = useRef<HTMLButtonElement>(null);
        return (
          <div style={{ margin: 20 }}>
            <button ref={btnRef}>按钮</button>
            <Tour
              placement={'bottom'}
              arrow={arrow}
              steps={[
                {
                  title: '创建',
                  description: '创建一条数据',
                  target: () => btnRef.current,
                },
              ]}
            />
          </div>
        );
      };

      const { rerender } = render(<Demo />);
      expect(document.querySelector(`.rc-tour-arrow`)).toBeTruthy();

      arrow = false;
      rerender(<Demo />);
      expect(document.querySelector(`.rc-tour-arrow`)).toBeFalsy();
    });
  });
});
