import React, { useState } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: 20 }}>
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Create
        </button>
        <button
          onClick={() => {
            setCurrent(current - 1);
          }}
        >
          prev
        </button>
        <button
          onClick={() => {
            setCurrent(current + 1);
          }}
        >
          next
        </button>
      </div>

      <div>Current page: {current + 1}</div>

      <div style={{ height: 200 }} />

      <Tour
        current={current}
        onChange={next => {
          console.log('next:', next)
          setCurrent(next)
        }}
        mask={false}
        onClose={() => setOpen(false)}
        open={open}
        steps={new Array(3).fill(null).map((_, index) => ({
          title: index + 1,
          description: index + 1,
        }))}
      />
    </div>
  );
};

export default App;
