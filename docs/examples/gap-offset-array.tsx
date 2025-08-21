import { useRef, useState } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const button1Ref = useRef<HTMLButtonElement>(null);
  const button2Ref = useRef<HTMLButtonElement>(null);
  const button3Ref = useRef<HTMLButtonElement>(null);
  
  const [open, setOpen] = useState(false);
  const offset: [number, number][] = [
    [10, 10],
    [20, 20],
    [30, 30],
  ]
  return (
    <div style={{ margin: 20 }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setOpen(true)}>Open</button>
        <button ref={button1Ref}>button 1</button>
        <button ref={button2Ref}>button 2</button>
        <button ref={button3Ref}>button 3</button>
      </div>


      <div style={{ height: 200 }} />
      <Tour
        open={open}
        gap={{
          offset
        }}
        steps={[
          {
            title: '创建1',
            description: '创建一条数据1',
            target: () => button1Ref.current,
            mask: true,
          },
          {
            title: '创建2',
            description: '创建一条数据2',
            target: () => button2Ref.current,
            mask: true,
          },
          {
            title: '创建3',
            description: '创建一条数据3',
            target: () => button3Ref.current,
            mask: true,
          },
        ]}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default App;
