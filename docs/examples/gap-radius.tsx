import { useRef, useState } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const [radius, setRadius] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: 20 }}>
      <div>
        <button onClick={() => setOpen(true)}>Open</button>
        <button
          style={{ marginLeft: 16, width: 150 }}
          ref={createBtnRef}
          onClick={() => {
            setRadius(radius + 1);
          }}
        >
          Increase radius: {radius}
        </button>
      </div>

      <div style={{ height: 200 }} />

      <Tour
        open={open}
        gap={{
          radius,
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
          setRadius(0);
        }}
      />
    </div>
  );
};

export default App;
