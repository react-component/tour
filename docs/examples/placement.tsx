import React, { Component, useRef, useState } from 'react';
import Trigger from 'rc-trigger';
import Tour from '../../src/index';
import './basic.less';
import { placements } from '@/placements';

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
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => btnRef.current,
            placement: placement,
            nextButtonProps: <button>下一步</button>,
            prevButtonProps: <button>上一步</button>,
          },
        ]}
      />
      {/*<Trigger*/}
      {/*  getPopupContainer={()=>document.querySelector('body')}*/}
      {/*  popupAlign={{*/}
      {/*    points: ['cc', 'cc'],*/}
      {/*    offset: [0, 200],*/}
      {/*    useCssBottom:true,*/}
      {/*    overflow: {*/}
      {/*      adjustX: 1,*/}
      {/*      adjustY: 1,*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  onPopupAlign={(node,align) => {*/}
      {/*    console.log('Align,ed!',node);*/}
      {/*    console.log('Align,ed!',align);*/}
      {/*  }}*/}
      {/*  popupStyle={{*/}
      {/*    top:20,*/}
      {/*    bottom:20*/}
      {/*  }}*/}
      {/*  popupPlacement={placement}*/}
      {/*  builtinPlacements={placements}*/}
      {/*  popupVisible={true}*/}
      {/*  popup={<div>i am a popup</div>}*/}
      {/*>*/}
      {/*  <></>*/}
      {/*</Trigger>*/}
    </div>
  );
};

export default MyControl;
