<div align="center">
  <h1>@rc-component/tour</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Ant Design 生态的一部分。</sub></p>
  <p>🧭 React 引导组件，用于创建分步产品导览。</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/tour"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/tour.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/tour"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/tour.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/tour/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/tour/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/tour"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/tour/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/tour"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/tour?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>


## 特性

- 跟踪步骤目标并通过触发器支持的弹层窗口渲染引导面板。
- 支持遮罩、箭头、间隙、滚动到视图、自定义内置布局和内联模式。
- 提供受控和非受控 `open` 和 `current` 状态。
- 支持面板、遮罩、页脚和操作的语义 `classNames` 和 `styles` 插槽。

## 安装

```bash
npm install @rc-component/tour
```

## 使用

```tsx pure
import Tour from '@rc-component/tour';

export default () => (
  <>
    <button id="create-button" type="button">
      Create
    </button>
    <Tour
      steps={[
        {
          title: 'Create',
          description: 'Create a new item.',
          target: () => document.getElementById('create-button'),
        },
      ]}
    />
  </>
);
```

在线预览：https://tour.react-component.vercel.app/

## 示例

运行本地 dumi 站点：

```bash
ut install
npm start
```

然后打开 `http://localhost:8000`。

## API

### Tour

| 名称                    | 类型                                                         | 默认值        | 说明                                          |
| ----------------------- | ------------------------------------------------------------ | -------------- | ---------------------------------------------------- |
| `animated`              | boolean \| `{ placeholder: boolean }`                        | false          | 启用目标占位动画。                 |
| `arrow`                 | boolean \| `{ pointAtCenter: boolean }`                      | true           | 显示箭头，并可选择指向目标中心。 |
| `builtinPlacements`     | TriggerProps['builtinPlacements'] \| function                | -              | 自定义位置映射。                                |
| `className`             | string                                                       | -              | 面板 className。                                    |
| `classNames`            | `Partial<Record<SemanticName, string>>`                      | -              | 语义 className。                                |
| `closable`              | boolean \| object                                            | -              | 关闭按钮配置。                                 |
| `closeIcon`             | React.ReactNode                                              | -              | 自定义关闭图标。                                   |
| `current`               | number                                                       | -              | 受控当前步骤。                             |
| `defaultCurrent`        | number                                                       | 0              | 初始当前步骤。                                |
| `defaultOpen`           | boolean                                                      | -              | 初始打开状态。                                  |
| `disabledInteraction`   | boolean                                                      | -              | 禁用与目标区域的交互。                |
| `gap`                   | Gap                                                          | -              | 目标周围的间隙偏移和半径。                 |
| `getPopupContainer`     | TriggerProps['getPopupContainer'] \| false                   | -              | 弹层容器解析函数。使用 false 表示内联模式。 |
| `keyboard`              | boolean                                                      | true           | 启用 Escape 和箭头键导航。              |
| `mask`                  | boolean \| `{ style?: React.CSSProperties; color?: string }` | true           | 遮罩配置。                                         |
| `onChange`              | `(current: number) => void`                                  | -              | 当前步骤更改时调用。                    |
| `onClose`               | `(current: number) => void`                                  | -              | 引导关闭时调用。                             |
| `onFinish`              | `() => void`                                                 | -              | 引导完成后调用。                             |
| `onPopupAlign`          | TriggerProps['onPopupAlign']                                 | -              | 弹层对齐后调用。                        |
| `open`                  | boolean                                                      | -              | 受控打开状态。                               |
| `placement`             | PlacementType                                                | -              | 默认面板位置。                             |
| `prefixCls`             | string                                                       | `'rc-tour'`    | className 前缀。                                   |
| `renderPanel`           | `(props, current) => ReactNode`                              | -              | 自定义面板渲染器。                               |
| `rootClassName`         | string                                                       | -              | 根 className。                                     |
| `scrollIntoViewOptions` | boolean \| ScrollIntoViewOptions                             | 中心选项 | 目标滚动行为。                              |
| `steps`                 | TourStepInfo[]                                               | []             | 漫游步骤。                                         |
| `style`                 | React.CSSProperties                                          | -              | 面板风格。                                         |
| `styles`                | `Partial<Record<SemanticName, React.CSSProperties>>`         | -              | 语义化样式。                                     |
| `zIndex`                | number                                                       | 1001           | 弹层 z 索引。                                       |

### TourStepInfo

| 名称                    | 类型                                       | 默认值   | 说明                 |
| ----------------------- | ------------------------------------------ | --------- | --------------------------- |
| `arrow`                 | boolean \| `{ pointAtCenter: boolean }`    | inherited | 步骤箭头配置。          |
| `className`             | string                                     | -         | 步骤面板 className。      |
| `closable`              | boolean \| object                          | inherited | 步骤关闭按钮配置。   |
| `closeIcon`             | React.ReactNode                            | inherited | 步骤关闭图标。            |
| `description`           | React.ReactNode                            | -         | 步骤描述。                  |
| `mask`                  | boolean \| object                          | inherited | 步骤遮罩配置。           |
| `placement`             | PlacementType                              | inherited | 步骤位置。             |
| `scrollIntoViewOptions` | boolean \| ScrollIntoViewOptions           | inherited | 步骤滚动行为。       |
| `style`                 | React.CSSProperties                        | -         | 步骤面板样式。       |
| `target`                | HTMLElement \| `() => HTMLElement \| null` | -         | 目标元素或解析器。 |
| `title`                 | React.ReactNode                            | -         | 步骤标题。                  |

## 本地开发

```bash
ut install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

dumi 站点默认运行在 `http://localhost:8000`。

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/tour 基于 [MIT](./LICENSE) 许可证发布。
