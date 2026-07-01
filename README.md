<div align="center">
  <h1>@rc-component/tour</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Part of the Ant Design ecosystem.</sub></p>
  <p>🧭 Guided React tours with masks, target tracking, keyboard navigation, and custom panels.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/tour"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/tour.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/tour"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/tour.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/tour/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/tour/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/tour"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/tour/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/tour"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/tour?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>


## Highlights

- Tracks step targets and renders guided panels through a trigger-backed popup.
- Supports masks, arrows, gaps, scrolling into view, custom built-in placements, and inline mode.
- Provides controlled and uncontrolled `open` and `current` state.
- Supports semantic `classNames` and `styles` slots for panels, mask, footer, and actions.

## Install

```bash
npm install @rc-component/tour
```

## Usage

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

## Examples

Run the local dumi site:

```bash
ut install
npm start
```

Then open `http://localhost:8000`.

## API

### Tour

| Name                    | Type                                                         | Default        | Description                                          |
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

| Name                    | Type                                       | Default   | Description                 |
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

## Development

```bash
ut install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

The dumi site runs at `http://localhost:8000` by default.

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/tour is released under the [MIT](./LICENSE) license.
