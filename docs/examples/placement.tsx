import React, { useRef, useState } from 'react';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '@/placements';
import type { placementType } from '@/placements';

const MyControl = () => {
  const [placement, setPlacement] = useState<placementType>('rightBottom');
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ margin: 20 }}>
      <select
        onChange={e => {
          setPlacement(e.target.value as placementType);
        }}
      >
        {Object.keys(placements).map((item: placementType) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <br />
      <p style={{ paddingLeft: 300 }}>
        <span
          ref={btnRef}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          第一步
        </span>
      </p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Tour
        current={0}
        key={placement}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => btnRef.current,
            placement: placement,
            nextButtonProps: {
              children: (
                <button className="ant-btn ant-btn-primary">下一步</button>
              ),
            },
            prevButtonProps: {
              children: (
                <button className="ant-btn ant-btn-primary">上一步</button>
              ),
            },
          },
        ]}
      />
    </div>
  );
};

export default MyControl;
