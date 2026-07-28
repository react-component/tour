import { useRef, useState } from "react";
import Tour from '../../src/index';

export default () => {
    const btn1Ref = useRef<HTMLButtonElement>(null);
    const btn2Ref = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false)

    return <div style={{ margin: 20 }}>
      <div>
        <button
          className="ant-target"
          ref={btn1Ref}
          style={{ marginLeft: 100 }}
          onClick={() => {
            setOpen(true);
          }}
        >
          button1
        </button>
        <button className="ant-target" ref={btn2Ref} style={{ marginLeft: 100 }}>
          defaultOpen
        </button>
      </div>

      <div style={{ height: 200 }} />

      <Tour
        defaultCurrent={1}
        open={open}
        onFinish={() => setOpen(false)}
        onClose={() => setOpen(false)}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => btn1Ref.current,
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
            target: () => btn2Ref.current,
          },
        ]}
      />
    </div>
}
