import React from 'react';
import Portal from '../../src';

const Content = (): React.ReactElement => {
  React.useEffect(() => {
    console.log('Content Mount!');
  }, []);

  return <>Bamboo</>;
};

export default () => {
  const divRef = React.useRef();

  return (
    <div
      ref={divRef}
      className="holder"
      style={{ minHeight: 10, border: '1px solid blue' }}
    >
      <Portal
        open
        getContainer={() => {
          return divRef.current;
        }}
      >
        <Content />
      </Portal>
    </div>
  );
};
