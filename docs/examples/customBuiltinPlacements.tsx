import React, { useMemo, useRef, useState } from 'react';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '../../src/placements';
import type { PlacementType } from '../../src/placements';
import type { BuildInPlacements } from 'rc-trigger';

function getCustomPlacements(delta: number): BuildInPlacements {
  const customPlacements: BuildInPlacements = {};
  Object.keys(placements).forEach((key: PlacementType) => {
    const oriPlacement = {...placements[key]};
    const oriOffset = oriPlacement.offset;
    if (key.startsWith("left") || key.startsWith("right")) {
      const symbol = key.startsWith("left") ? -1 : 1;
      oriPlacement.offset = [(oriOffset[0] + delta) * symbol, oriOffset[1]];
    } else {
      const symbol = key.startsWith("top") ? -1 : 1;
      oriPlacement.offset = [oriOffset[0], (oriOffset[1] + delta) * symbol];
    }
    
    customPlacements[key] = oriPlacement;
  });
  return customPlacements;
}



const App = () => {
  const [placement, setPlacement] = useState<PlacementType>('rightBottom');
  const btnRef = useRef<HTMLButtonElement>(null);
  const [delta, setDelta] = useState(50);
  const customPlacements = useMemo(() => getCustomPlacements(delta), [delta]);
  return (
    <div style={{ margin: 20 }}>
      <select
        onChange={e => {
          setPlacement(e.target.value as PlacementType);
        }}
      >
        {Object.keys(placements).map((item: PlacementType) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>

      <p>自定义偏移量：<input value={delta} onChange={e => setDelta(parseFloat(e.target.value))} /></p>

      <div style={{ height: 300 }} />

      <p style={{ paddingLeft: 300 }}>
        <span
          ref={btnRef}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          第一步
        </span>
      </p>

      <div style={{ height: 300 }} />

      <Tour
        defaultCurrent={0}
        key={placement}
        builtinPlacements={customPlacements}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => btnRef.current,
            placement: placement,
          },
        ]}
      />
    </div>
  );
};

export default App;
