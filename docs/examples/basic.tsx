import React, { useRef } from 'react';
import Tour from '../../src/index';
import './basic.less';

const App = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const updateBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ margin: 20 }}>
      <div>
        <button
          className="ant-target"
          ref={createBtnRef}
          style={{ marginLeft: 100 }}
        >
          Create
        </button>
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
        <button className="ant-target" ref={updateBtnRef}>
          Update
        </button>
        <button className="ant-target" ref={deleteBtnRef}>
          Delete
        </button>
      </div>
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
        defaultCurrent={2}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => createBtnRef.current,
            mask: true,
          },
          {
            title: '更新',
            cover: (
              <img
                src="https://avatars0.githubusercontent.com/u/9441414?s=200&v=4"
                alt="更新"
              />
            ),
            description: (
              <div>
                <span>更新一条数据</span>
                <button>帮助文档</button>
              </div>
            ),
            mask: false,
            target: () => updateBtnRef.current,
          },
          {
            title: '删除',
            cover: <video src="example.com" />,
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
