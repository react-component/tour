<div align="center">
  <h1>@rc-component/tour</h1>
  <p><sub>Ant Design 生态的一部分。</sub></p>
  <p>🧭 React 引导组件，用于创建分步产品导览。</p>

  <p>
    <a href="https://www.npmjs.com/package/@rc-component/tour"><img src="https://img.shields.io/npm/v/@rc-component/tour.svg?style=flat-square" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/@rc-component/tour"><img src="https://img.shields.io/npm/dm/@rc-component/tour.svg?style=flat-square" alt="npm downloads" /></a>
    <a href="https://github.com/react-component/tour/actions"><img src="https://github.com/react-component/tour/actions/workflows/react-component-ci.yml/badge.svg" alt="CI" /></a>
    <a href="https://codecov.io/gh/react-component/tour"><img src="https://img.shields.io/codecov/c/github/react-component/tour/master.svg?style=flat-square" alt="Codecov" /></a>
    <a href="https://bundlephobia.com/package/@rc-component/tour"><img src="https://badgen.net/bundlephobia/minzip/@rc-component/tour" alt="bundle size" /></a>
    <a href="https://github.com/umijs/dumi"><img src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square" alt="dumi" /></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>


## 特性

- Tracks step targets and renders guided panels through a trigger-backed popup.
- 支持 masks, arrows, gaps, scrolling into view, custom built-in placements, and inline mode.
- 提供 controlled and uncontrolled `open` and `current` state.
- 支持 semantic `classNames` and `styles` slots for panels, mask, footer, and actions.

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

Online preview: https://tour.react-component.vercel.app/

## API

### Tour

| 名称                    | 类型                                                         | 默认值        | 说明                                          |
| ----------------------- | ------------------------------------------------------------ | -------------- | ---------------------------------------------------- |
| `animated`              | boolean \| `{ placeholder: boolean }`                        | false          | Enable target placeholder animation.                 |
| `arrow`                 | boolean \| `{ pointAtCenter: boolean }`                      | true           | Show arrow and optionally point it at target center. |
| `builtinPlacements`     | TriggerProps['builtinPlacements'] \| function                | -              | Custom placement map.                                |
| `className`             | string                                                       | -              | Panel class name.                                    |
| `classNames`            | `Partial<Record<SemanticName, string>>`                      | -              | Semantic class names.                                |
| `closable`              | boolean \| object                                            | -              | Close button config.                                 |
| `closeIcon`             | React.ReactNode                                              | -              | Custom close icon.                                   |
| `current`               | number                                                       | -              | Controlled current step.                             |
| `defaultCurrent`        | number                                                       | 0              | Initial current step.                                |
| `defaultOpen`           | boolean                                                      | -              | Initial open state.                                  |
| `disabledInteraction`   | boolean                                                      | -              | Disable interaction with target area.                |
| `gap`                   | Gap                                                          | -              | Gap offset and radius around target.                 |
| `getPopupContainer`     | TriggerProps['getPopupContainer'] \| false                   | -              | Popup container resolver. Use false for inline mode. |
| `keyboard`              | boolean                                                      | true           | Enable Escape and arrow-key navigation.              |
| `mask`                  | boolean \| `{ style?: React.CSSProperties; color?: string }` | true           | Mask config.                                         |
| `onChange`              | `(current: number) => void`                                  | -              | Called when current step changes.                    |
| `onClose`               | `(current: number) => void`                                  | -              | Called when tour closes.                             |
| `onFinish`              | `() => void`                                                 | -              | Called when tour finishes.                           |
| `onPopupAlign`          | TriggerProps['onPopupAlign']                                 | -              | Called after popup alignment.                        |
| `open`                  | boolean                                                      | -              | Controlled open state.                               |
| `placement`             | PlacementType                                                | -              | Default panel placement.                             |
| `prefixCls`             | string                                                       | `'rc-tour'`    | Prefix class name.                                   |
| `renderPanel`           | `(props, current) => ReactNode`                              | -              | Custom panel renderer.                               |
| `rootClassName`         | string                                                       | -              | Root class name.                                     |
| `scrollIntoViewOptions` | boolean \| ScrollIntoViewOptions                             | center options | Target scroll behavior.                              |
| `steps`                 | TourStepInfo[]                                               | []             | Tour steps.                                          |
| `style`                 | React.CSSProperties                                          | -              | Panel style.                                         |
| `styles`                | `Partial<Record<SemanticName, React.CSSProperties>>`         | -              | Semantic styles.                                     |
| `zIndex`                | number                                                       | 1001           | Popup z-index.                                       |

### TourStepInfo

| 名称                    | 类型                                       | 默认值   | 说明                 |
| ----------------------- | ------------------------------------------ | --------- | --------------------------- |
| `arrow`                 | boolean \| `{ pointAtCenter: boolean }`    | inherited | Step arrow config.          |
| `className`             | string                                     | -         | Step panel class name.      |
| `closable`              | boolean \| object                          | inherited | Step close button config.   |
| `closeIcon`             | React.ReactNode                            | inherited | Step close icon.            |
| `description`           | React.ReactNode                            | -         | Step description.           |
| `mask`                  | boolean \| object                          | inherited | Step mask config.           |
| `placement`             | PlacementType                              | inherited | Step placement.             |
| `scrollIntoViewOptions` | boolean \| ScrollIntoViewOptions           | inherited | Step scroll behavior.       |
| `style`                 | React.CSSProperties                        | -         | Step panel style.           |
| `target`                | HTMLElement \| `() => HTMLElement \| null` | -         | Target element or resolver. |
| `title`                 | React.ReactNode                            | -         | Step title.                 |

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

## 发布

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## 许可证

@rc-component/tour is released under the [MIT](./LICENSE) license.
