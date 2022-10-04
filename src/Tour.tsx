import * as React from 'react';
import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import Trigger from 'rc-trigger';
import type { TriggerProps } from 'rc-trigger';
import classNames from 'classnames';
import TourContext, { TourProvider } from './context';
import { placements as builtinPlacements } from './placements';
import TourStep from './TourStep';
import Mask from './Mask';
import type { TourStepProps } from './TourStep';
import placements from './placements';
import { offset } from '@/util';

// TODO
// 3. 非块级元素获取不到 width,height, 测试场景,  弹窗居中的场景
// 4. 参考https://ant.design/components/popover-cn/ demo
// 5. 找不到target如何居中 箭头不显示
// 1. 关闭按钮

export interface TourProps extends TriggerProps {
  steps: TourStepProps[]; // 引导步骤
  open: boolean; // 受控打开引导（与 current 受控分开）
  current: number; // 受控当前处于哪一步
  onChange: (current: number) => void; // 步骤改变时的回调，current为改变前的步骤，next为改变后的步骤
  onClose: (current: number) => void; // 关闭引导时的回调
  onFinish: () => void; // 完成引导时的回调
  mask: boolean; // true,	整体是否启用蒙层
  arrow: boolean | { pointAtCenter: boolean }; //	true	整体是否显示箭头，包含是否指向元素中心的配置
  type: 'default' | 'primary'; //	default	整体类型，影响底色与文字颜色
  rootClassName: string;
  placement:
    | `left`
    | `leftTop`
    | `leftBottom`
    | `right`
    | `rightTop`
    | `rightBottom`
    | `top`
    | `topLeft`
    | `topRight`
    | `bottom`
    | `bottomLeft`
    | `bottomRight`;
}

const Tour = (props: TourProps, ref: any) => {
  const {
    popupClassName,
    prefixCls = 'rc-tour',
    children,
    steps,
    open,
    current = 0,
    onChange,
    onClose,
    onFinish,
    mask = true, //	整体是否启用蒙层
    arrow = true,
    type,
    rootClassName,
    ...restProps
  } = props;

  const [currentStep, setCurrentStep] = useState(current);
  const [mergeMask, setMergeMask] = useState(mask);
  const getPopupElement = () => {
    return [
      arrow && <div className={`${prefixCls}-arrow`} key="arrow" />,
      <TourStep
        key="content"
        prefixCls={prefixCls}
        rootClassName={rootClassName}
        steps={steps}
        current={currentStep}
        {...steps[currentStep]}
      />,
    ];
  };
  const {
    target,
    placement = 'bottom',
    style: stepStyle,
  } = steps[currentStep] || {};
  const [mergedPlacement, setMergedPlacement] = useState(placement);
  const popupVisible = 0 <= currentStep && currentStep < steps.length;
  const maskRef = useRef(null);

  useLayoutEffect(() => {
    const targetDom = typeof target === 'function' ? target() : target;
    if (!targetDom) {
      console.log('-----这里只有notFound执行');
      setMergedPlacement('center');
      // setMergedTarget(() => document.querySelector('body'));
    }
  });
  // useLayoutEffect(() => {
  //   console.log(maskRef.current);
  //   console.log(maskRef.current.getBBox());
  //   let position = null;
  //   const mergedTarget = typeof target === 'function' ? target() : target;
  //   if (!mergedTarget) {
  //   } else {
  //     const {
  //       left,
  //       top,
  //       offsetWidth,
  //       offsetHeight,
  //       style = { borderRadius: 0 },
  //     } = offset(mergedTarget);
  //     position = {
  //       left,
  //       top,
  //       width: offsetWidth,
  //       height: offsetHeight,
  //       style,
  //     };
  //   }
  // }, [target, mergeMask]);

  return (
    <TourProvider
      value={{
        currentStep,
        setCurrentStep,
        mergeMask,
        setMergeMask,
      }}
    >
      <Trigger
        {...restProps}
        getPopupContainer={target}
        popupAlign={{
          points: placements[mergedPlacement].points,
          offset: placements[mergedPlacement].offset,
        }}
        popupPlacement={mergedPlacement}
        builtinPlacements={placements}
        popupVisible={popupVisible}
        key={currentStep}
        popupClassName={rootClassName}
        prefixCls={prefixCls}
        popup={getPopupElement}
        autoDestroy={true}
      >
        <></>
      </Trigger>
      <Mask
        prefixCls={prefixCls}
        steps={steps}
        ref={maskRef}
        rootClassName={rootClassName}
      />
    </TourProvider>
  );
};

export default forwardRef(Tour);
