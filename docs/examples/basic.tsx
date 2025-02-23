import React, { useRef } from 'react';
import Tour from '../../src/index';
import './basic.less';

const Demo = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const updateBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ margin: 20 }}>
      <div>
        <button ref={createBtnRef}>Create</button>
        <div style={{ height: 200 }} />
        <button ref={updateBtnRef}>Update</button>
        <button ref={deleteBtnRef}>Delete</button>
      </div>
      <div style={{ height: 200 }} />

      <Tour
        defaultCurrent={1}
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
          },
          {
            title: '删除',
            description: (
              <div>
                <span>危险操作:删除一条数据</span>
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

export default Demo;
