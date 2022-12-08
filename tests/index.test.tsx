import React, { useState, useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Tour from '../src/index';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { act } from 'react-dom/test-utils';
import { resizeWindow } from './utils';

describe('Tour', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('steps in undefined', async () => {
    const Demo = () => {
      return (
        <div style={{ margin: 20 }}>
          <Tour />
        </div>
      );
    };
    render(<Demo />);
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
    expect(document.querySelector('.rc-tour-placeholder-animated')).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renderPanel', async () => {
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
            renderPanel={(props, current) => (
              <div>
                {props.title},当前在第{current}步,描述为{props.description}
              </div>
            )}
          />
        </div>
      );
    };
    const { getByText, container } = render(<Demo />);
    expect(getByText('创建,当前在第0步,描述为创建一条数据')).toBeTruthy();
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
    fireEvent.click(screen.getByRole('button', { name: 'Prev' }));
    expect(getByText('创建一条数据')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(getByText('更新一条数据')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(getByText('危险操作:删除一条数据')).toBeTruthy();
    expect(document.querySelector('.rc-tour')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(document.querySelector('.rc-tour')).toBeFalsy();
  });

  describe('animated', () => {
    const Demo = ({ animated }) => {
      const btnRef = useRef<HTMLButtonElement>(null);
      return (
        <div style={{ margin: 20 }}>
          <button ref={btnRef}>按钮</button>
          <Tour
            placement={'bottom'}
            rootClassName={'customClassName'}
            animated={animated}
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
    it('false', () => {
      render(<Demo animated={false} />);
      expect(
        document.querySelector('.rc-tour-placeholder-animated'),
      ).toBeFalsy();
    });
    it('true', () => {
      render(<Demo animated={true} />);
      expect(
        document.querySelector('.rc-tour-placeholder-animated'),
      ).toBeTruthy();
    });
    it('placeholder true ', () => {
      render(<Demo animated={{ placeholder: true }} />);
      expect(
        document.querySelector('.rc-tour-placeholder-animated'),
      ).toBeTruthy();
    });
  });

  it('rootClassName', async () => {
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
    render(<Demo />);

    expect(document.querySelector('.rc-tour.customClassName')).toBeTruthy();
    expect(
      document.querySelector('.rc-tour-mask.customClassName'),
    ).toBeTruthy();
    expect(
      document.querySelector('.rc-tour-target-placeholder.customClassName'),
    ).toBeTruthy();
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

  it('onClose', () => {
    const onClose = jest.fn();
    render(
      <Tour
        onClose={onClose}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
          },
        ]}
      />,
    );

    fireEvent.click(document.querySelector('.rc-tour-close-x'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should return step 1 when reopen', () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button className="open-tour" onClick={() => setOpen(true)}>
            open
          </button>
          <Tour
            open={open}
            onClose={() => setOpen(false)}
            steps={[
              {
                title: 'step 1',
                description: '创建一条数据',
              },
              {
                title: 'step 2',
                description: '创建一条数据',
              },
            ]}
          />
        </>
      );
    };

    render(<Demo />);

    fireEvent.click(document.querySelector('.open-tour'));
    fireEvent.click(document.querySelector('.rc-tour-next-btn'));
    expect(document.querySelector('.rc-tour-title').innerHTML).toBe('step 2');
    fireEvent.click(document.querySelector('.rc-tour-close-x'));
    fireEvent.click(document.querySelector('.open-tour'));
    expect(document.querySelector('.rc-tour-title').innerHTML).toBe('step 1');
  });

  it('should keep current when controlled', () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      const [current, setCurrent] = useState(0);
      return (
        <>
          <button className="open-tour" onClick={() => setOpen(true)}>
            open
          </button>
          <Tour
            current={current}
            onChange={setCurrent}
            open={open}
            onClose={() => setOpen(false)}
            steps={[
              {
                title: 'step 1',
                description: '创建一条数据',
              },
              {
                title: 'step 2',
                description: '创建一条数据',
              },
            ]}
          />
        </>
      );
    };

    render(<Demo />);

    fireEvent.click(document.querySelector('.open-tour'));
    fireEvent.click(document.querySelector('.rc-tour-next-btn'));
    expect(document.querySelector('.rc-tour-title').innerHTML).toBe('step 2');
    fireEvent.click(document.querySelector('.rc-tour-close-x'));
    fireEvent.click(document.querySelector('.open-tour'));
    expect(document.querySelector('.rc-tour-title').innerHTML).toBe('step 2');
  });

  const mockBtnRect = (rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    spyElementPrototypes(HTMLButtonElement, {
      getBoundingClientRect: {
        get(): any {
          return () => ({ ...rect, left: rect.x, top: rect.y });
        },
      },
      scrollIntoView: {
        get(): any {
          return val => val;
        },
      },
    });
  };

  it('should update position when window resize', async () => {
    mockBtnRect({
      x: 800,
      y: 333,
      width: 230,
      height: 180,
    });
    const Demo = () => {
      const btnRef = useRef<HTMLButtonElement>(null);

      return (
        <div style={{ width: '100%' }}>
          <button
            className="btn2"
            ref={btnRef}
            onClick={() => {
              mockBtnRect({
                x: 15,
                y: 10,
                width: 230,
                height: 180,
              });
              resizeWindow(300, 200);
            }}
          >
            按钮
          </button>
          <Tour
            open
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
    const { baseElement, unmount } = render(<Demo />);
    expect(
      baseElement.querySelector('.rc-tour-target-placeholder'),
    ).toHaveStyle('left: 794px; top: 327px; width: 242px; height: 192px;');
    fireEvent.click(baseElement.querySelector('.btn2'));
    await act(() => {
      jest.runAllTimers();
    });
    expect(
      baseElement.querySelector('.rc-tour-target-placeholder'),
    ).toHaveStyle('left: 9px; top: 4px; width: 242px; height: 192px;');

    expect(baseElement).toMatchSnapshot();

    unmount();
    mockBtnRect({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  });
});
