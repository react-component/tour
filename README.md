# rc-tour

React 18 supported Tour Component.

[![NPM version][npm-image]][npm-url] [![dumi](https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square)](https://github.com/umijs/dumi) [![build status][github-actions-image]][github-actions-url] [![Codecov][codecov-image]][codecov-url] [![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-tour.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-tour
[github-actions-image]: https://github.com/react-component/tour/workflows/CI/badge.svg
[github-actions-url]: https://github.com/react-component/tour/actions
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/tour/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/react-component/tour/branch/master
[download-image]: https://img.shields.io/npm/dm/rc-tour.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-tour

## Development

```bash
npm install
npm start
open http://localhost:8000
```

## Feature

- React life cycle support tour component

## Install

[![rc-tour](https://nodei.co/npm/rc-tour.png)](https://npmjs.org/package/rc-tour)

## Usage

```js | pure
import Tour from 'rc-tour';

const Demo = () => {
    const createBtnRef = useRef<HTMLButtonElement>(null);
    const updateBtnRef = useRef<HTMLButtonElement>(null);
    const deleteBtnRef = useRef<HTMLButtonElement>(null);
    return (
        <div style={{ margin: 20 }}>
            <div>
                <button
                    className="ant-target"
                    ref={createBtnRef}
                    style={{ marginLeft: 100 }}
                >
                    Create
                </button>
                <div style={{ height: 200 }} />
                <button className="ant-target" ref={updateBtnRef}>
                    Update
                </button>
                <button className="ant-target" ref={deleteBtnRef}>
                    Delete
                </button>
            </div>

            <div style={{ height: 200 }} />

            <Tour
                defaultCurrent={0}
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
                                <span>危险操作：删除一条数据</span>
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

export default Demo;
```

## 🔥 API

We use typescript to create the Type definition. You can view directly in IDE. But you can still check the type definition [here](https://github.com/react-component/tour/blob/master/src/interface.ts).

### Tour

| Prop     | Description                       | Type                                 | Default                    |
|----------|-----------------------------------|--------------------------------------|----------------------------|
| steps    |  | TourStepInfo[]                       | document.body              |
| open     |                    | boolean                              | false                      |
| defaultCurrent |       | number                               | 0                          |
| current |                                   | number                               | -                          |
| onChange |                                   | (current: number) => void;           | -                          |
| onClose |                                   | () => void;                          | 0                          |
| onFinish |                                   | () => void;                          | -                          |
| mask |                                   | boolean                              | true                       |
| arrow |                                   | boolean\| { pointAtCenter: boolean }; | true          |
| rootClassName |                                   | string                               | ''                         |
| placement |                               | `left` \|  `leftTop` \| `leftBottom` \| `right` \| `rightTop` \| `rightBottom` \| `top`  \| `topLeft` \| `topRight` \| `bottom`  \| `bottomLeft` \| `bottomRight`  \| `center`   | ''                          |
| prefixCls |                                   | string                               | { pointAtCenter: boolean }; | true          |
| renderPanel |                                   | (panel: TourStepProps) => ReactNode; | { pointAtCenter: boolean }; | true          |
| gap |                                   | gap                                  | -                          | true          |