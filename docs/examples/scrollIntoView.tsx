import React, { useRef, useState } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const updateBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [curScrollIntoViewOptions, setCurScrollIntoViewOptions] = useState<ScrollIntoViewOptions>({
    block: 'start'
  });
  return (
    <div style={{ margin: 20 }}>
      <h2>{JSON.stringify(curScrollIntoViewOptions)}</h2>
      <button onClick={() => setCurScrollIntoViewOptions({block: 'start'})}>block start</button>
      <button onClick={() => setCurScrollIntoViewOptions({block: 'center'})}>block center</button>
      <button onClick={() => setCurScrollIntoViewOptions({block: 'nearest'})}>block nearest</button>
      <button onClick={() => setCurScrollIntoViewOptions({block: 'end'})}>block end</button>
      <button onClick={() => setCurScrollIntoViewOptions({inline: 'start'})}>inline start</button>
      <button onClick={() => setCurScrollIntoViewOptions({inline: 'center'})}>inline center</button>
      <button onClick={() => setCurScrollIntoViewOptions({inline: 'nearest'})}>inline nearest</button>
      <button onClick={() => setCurScrollIntoViewOptions({inline: 'end'})}>inline end</button>
      <div>
        <button
          className="ant-target"
          ref={createBtnRef}
          style={{ marginLeft: 100 }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Create
        </button>
        <div style={{ height: 1000 }} />
        <button className="ant-target" ref={updateBtnRef}>
          Update
        </button>
        <button className="ant-target" ref={deleteBtnRef}>
          Delete
        </button>
      </div>
      <div style={{ height: 200 }} />

      <Tour
        open={open}
        animated={true}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
        scrollIntoViewOptions={curScrollIntoViewOptions}
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
            scrollIntoViewOptions: {
              block: 'start', behavior:'smooth'
            }
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

export default App;
