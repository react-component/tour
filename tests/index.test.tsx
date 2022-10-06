global.isOverflow = true;

jest.mock('../src/util', () => {
  const origin = jest.requireActual('../src/util');
  return {
    ...origin,
    isBodyOverflowing: () => global.isOverflow,
  };
});

describe('Portal', () => {
  beforeEach(() => {
    global.isOverflow = true;
  });

  // it('Order', () => {
  //   render(
  //     <Portal open debug="root">
  //       <p>Root</p>
  //       <Portal open debug="parent">
  //         <p>Parent</p>
  //         <Portal open debug="children">
  //           <p>Children</p>
  //         </Portal>
  //       </Portal>
  //     </Portal>,
  //   );
  //
  //   const pList = Array.from(document.body.querySelectorAll('p'));
  //   expect(pList).toHaveLength(3);
  //   expect(pList.map(p => p.textContent)).toEqual([
  //     'Root',
  //     'Parent',
  //     'Children',
  //   ]);
  // });
  //
  // describe('getContainer', () => {
  //   it('false', () => {
  //     const { container } = render(
  //       <>
  //         Hello
  //         <Portal open getContainer={false}>
  //           Bamboo
  //         </Portal>
  //         Light
  //       </>,
  //     );
  //
  //     expect(container).toMatchSnapshot();
  //   });
  //
  //   it('customize in same level', () => {
  //     let renderTimes = 0;
  //
  //     const Content = () => {
  //       React.useEffect(() => {
  //         renderTimes += 1;
  //       });
  //
  //       return <>Bamboo</>;
  //     };
  //
  //     const Demo = () => {
  //       const divRef = React.useRef();
  //
  //       return (
  //         <div ref={divRef} className="holder">
  //           <Portal open getContainer={() => divRef.current}>
  //             <Content />
  //           </Portal>
  //         </div>
  //       );
  //     };
  //
  //     const { container } = render(<Demo />);
  //     expect(container).toMatchSnapshot();
  //     expect(renderTimes).toEqual(1);
  //   });
  // });
  //
  // describe('dynamic change autoLock', () => {
  //   function test(name: string, config?: Parameters<typeof render>[1]) {
  //     it(name, () => {
  //       const { rerender } = render(<Portal open />, config);
  //       expect(document.body).not.toHaveStyle({
  //         overflowY: 'hidden',
  //       });
  //
  //       rerender(<Portal open autoLock />);
  //       expect(document.body).toHaveStyle({
  //         overflowY: 'hidden',
  //       });
  //
  //       rerender(<Portal open={false} autoLock />);
  //       expect(document.body).not.toHaveStyle({
  //         overflowY: 'hidden',
  //       });
  //
  //       rerender(<Portal open autoLock />);
  //       expect(document.body).toHaveStyle({
  //         overflowY: 'hidden',
  //       });
  //
  //       rerender(<Portal open autoLock={false} />);
  //       expect(document.body).not.toHaveStyle({
  //         overflowY: 'hidden',
  //       });
  //     });
  //   }
  //
  //   test('basic');
  //   test('StrictMode', {
  //     wrapper: React.StrictMode,
  //   });
  //
  //   it('window not scrollable', () => {
  //     global.isOverflow = false;
  //     render(<Portal open />);
  //
  //     expect(document.body).not.toHaveStyle({
  //       overflowY: 'hidden',
  //     });
  //   });
  // });
  //
  // it('autoDestroy', () => {
  //   expect(document.querySelector('p')).toBeFalsy();
  //
  //   const renderDemo = (open: boolean, autoDestroy: boolean) => (
  //     <Portal open={open} autoDestroy={autoDestroy}>
  //       <p>Root</p>
  //     </Portal>
  //   );
  //
  //   const { rerender } = render(renderDemo(true, false));
  //   expect(document.querySelector('p')).toBeTruthy();
  //
  //   rerender(renderDemo(false, false));
  //   expect(document.querySelector('p')).toBeTruthy();
  //
  //   rerender(renderDemo(false, true));
  //   expect(document.querySelector('p')).toBeFalsy();
  // });
});
