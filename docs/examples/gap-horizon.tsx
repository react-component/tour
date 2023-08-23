import { useRef, useState } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const [offsetX, setOffsetX] = useState(6);
  const [offsetY, setOffsetY] = useState(6);
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: 20 }}>
      <div ref={createBtnRef}>
        <button onClick={() => setOpen(true)}>Open</button>
        <button
          style={{ marginLeft: 16, width: 150 }}
          onClick={() => {
            setOffsetX(offsetX + 1);
          }}
        >
          Increase offsetX: {offsetX}
        </button>
        <button
          style={{ marginLeft: 16, width: 150 }}
          onClick={() => {
            setOffsetY(offsetY + 1);
          }}
        >
          Increase offsetY: {offsetY}
        </button>
      </div>

      <div style={{ height: 200 }} />

      <Tour
        open={open}
        gap={{
          offset: [offsetX, offsetY],
        }}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => createBtnRef.current,
            mask: true,
          },
        ]}
        onClose={() => {
          setOpen(false);
          setOffsetX(6);
          setOffsetY(6);
        }}
      />
    </div>
  );
};

export default App;
