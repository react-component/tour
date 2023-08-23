import { useRef, useState } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState(6);
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: 20 }}>
      <div>
        <button onClick={() => setOpen(true)}>Open</button>
        <button
          style={{ marginLeft: 16, width: 150 }}
          ref={createBtnRef}
          onClick={() => {
            setOffset(offset + 1);
          }}
        >
          Increase offset: {offset}
        </button>
      </div>

      <div style={{ height: 200 }} />

      <Tour
        open={open}
        gap={{
          offset,
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
          setOffset(6);
        }}
      />
    </div>
  );
};

export default App;
