import React, { useState, useRef, useEffect } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Tour from '../src/index';
import useTarget from '../src/hooks/useTarget';
import { act } from 'react-dom/test-utils';

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};

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
  it('should update position when window resize', async () => {
    const fn = jest.fn();
    const Demo = () => {
      const btnRef = useRef<HTMLButtonElement>(null);
      const [posInfo] = useTarget(() => btnRef.current, true);
      useEffect(() => {
        fn(posInfo?.__testFlag__);
      }, [posInfo?.__testFlag__]);
      return (
        <div style={{ width: '100%' }}>
          <button className="btn2" ref={btnRef}>
            {posInfo?.__testFlag__}
          </button>
        </div>
      );
    };
    const { baseElement, unmount } = render(<Demo />);
    expect(fn).toBeCalledWith('1024X768');
    await act(() => {
      resizeWindow(100, 100);
    });
    expect(fn).toBeCalledWith('100X100');
    await act(() => {
      resizeWindow(2000, 700);
    });
    expect(fn).toBeCalledWith('2000X700');
    expect(baseElement).toMatchSnapshot();
    unmount();
    await act(() => {
      resizeWindow(333, 333);
    });
    expect(fn).not.toBeCalledWith('333X333');
  });
});
