import React, { useRef, useState } from 'react';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '../../src/placements';
import type { PlacementType } from '../../src/placements';

const App = () => {
  const [placement, setPlacement] = useState<PlacementType>('rightBottom');
  const btnRef = useRef<HTMLButtonElement>(null);
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
