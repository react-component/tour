import React, { useRef, useState } from 'react';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '../../src/placements';

const MyControl = () => {
  const [placement, setPlacement] = useState('rightBottom');
  const btnRef = useRef<HTMLButtonElement>(null);
  console.log('placement', placement);
  return (
    <div style={{ margin: 20 }}>
      <select
        onChange={e => {
          setPlacement(e.target.value);
        }}
      >
        {Object.keys(placements).map(item => (
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
      <p style={{ paddingLeft: 400 }}>
        <span
          ref={btnRef}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          第一步
        </span>{' '}
      </p>
      <Tour
        current={0}
        key={placement}
        arrow={{ pointAtCenter: true }}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => btnRef.current,
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
