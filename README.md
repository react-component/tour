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
import Tour from '@rc-component/tour';

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

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| steps | `TourStepProps[]`  | - | 引导步骤 |
| open | `boolean` | - | 受控打开引导（与 `current` 受控分开） |
| current | `number` | - | 受控当前处于哪一步 |
| onChange | `(current: number) => void` | - | 步骤改变时的回调，`current`为改变前的步骤，`next`为改变后的步骤 |
| onClose | `(current: number) => void` | - | 关闭引导时的回调 |
| onFinish | `() => void` | - | 完成引导时的回调 |
| mask | `boolean` | `true` | 整体是否启用蒙层 |
| arrow | `boolean`&#124; `{ pointAtCenter: boolean}`  | `true` | 整体是否显示箭头，包含是否指向元素中心的配置 |
| type | `default`&#124; `primary`  | `default` | 整体类型，影响底色与文字颜色 |

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| target | `() => HTMLElement`&#124; `HTMLElement`   | - | 获取引导卡片指向的元素 |
| arrow | `boolean`&#124; `{ pointAtCenter: boolean}`  | `true` | 是否显示箭头，包含是否指向元素中心的配置 |
| cover | `ReactNode` | - | 展示的图片或者视频 |
| title | `ReactNode` | - | 标题 |
| description | `ReactNode` | - | 主要描述部分 |
| placement | `left`&#124; `leftTop` &#124; `leftBottom` &#124; `right`&#124; `rightTop`&#124; `rightBottom`&#124; `top`&#124; `topLeft`&#124; `topRight`&#124; `bottom` &#124; `bottomLeft`&#124; `bottomRight` | `bottom` | 引导卡片相对于目标元素的位置 |
| onClose | `Function` | - | 关闭引导时的回调函数 |
| mask | `boolean` | `true` | 是否启用蒙层，默认跟随 Tour 的 `mask` 属性 |
| type | `default`&#124; `primary`  | `default` | 类型，影响底色与文字颜色 |
| nextButtonProps | `{ children: ReactNode; onClick: Function }` |  `{ children: '下一步' }`  | 下一步按钮的属性 |
| prevButtonProps | `{ children: ReactNode; onClick: Function }` |  `{ children: '上一步' }`  | 上一步按钮的属性 |
| className | `string` | - | - |
| style | `React.CSSProperties` | - | - |