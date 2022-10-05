import type { BuildInPlacements } from 'rc-trigger';

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

export type placementType =
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom'
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'center';

const targetOffset = [0, 0];
const documentHeight =
  document.documentElement.clientHeight || document.body.clientHeight;
export const placements: BuildInPlacements = {
  left: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
  right: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
  top: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 18],
    targetOffset,
  },
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  leftTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  rightTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  rightBottom: {
    points: ['bl', 'br'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  leftBottom: {
    points: ['br', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
  center: {
    points: ['cc', 'cc'],
    offset: [0, documentHeight / 2],
    targetOffset,
    overflow: autoAdjustOverflow,
  },
};

export default placements;
