import * as React from 'react';

export interface TourStepProps {
  prefixCls?: string;
  overlay: (() => React.ReactNode) | React.ReactNode;
  overlayInnerStyle?: React.CSSProperties;
  target: (() => HTMLElement) | HTMLElement; //	-	获取引导卡片指向的元素
  arrow: boolean | { pointAtCenter: boolean }; //	true	是否显示箭头，包含是否指向元素中心的配置
  cover: React.ReactNode; //	-	展示的图片或者视频
  title: React.ReactNode; //	-	标题
  description: React.ReactNode; //	-	主要描述部分
  placement:
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'right'
    | 'rightTop'
    | 'rightBottom'
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'; // 'bottom',引导卡片相对于目标元素的位置
  onClose: () => void; //	-	关闭引导时的回调函数
  mask: boolean; //	true	是否启用蒙层，默认跟随 Tour 的 mask 属性
  type: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
  nextButtonProps: { children: React.ReactNode; onClick: () => void }; //	{ children: '下一步' }	下一步按钮的属性
  prevButtonProps: { children: React.ReactNode; onClick: () => void }; //	{ children: '上一步' }	上一步按钮的属性
  className: string;
  style: React.CSSProperties;
}

const TourStep = (props: TourStepProps) => {
  const { overlay, prefixCls, id, overlayInnerStyle } = props;

  return (
    <div
      className={`${prefixCls}-inner`}
      id={id}
      role="tooltip"
      style={overlayInnerStyle}
    >
      {typeof overlay === 'function' ? overlay() : overlay}
    </div>
  );
};

export default TourStep;
