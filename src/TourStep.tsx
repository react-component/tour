import * as React from 'react';
import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
  useState,
  useContext,
} from 'react';
import TourContext, { TourConsumer } from './context';
import classNames from 'classnames';
export interface TourStepProps {
  prefixCls?: string;
  target: (() => HTMLElement) | HTMLElement; //	获取引导卡片指向的元素
  arrow?: boolean | { pointAtCenter: boolean }; // 是否显示箭头，包含是否指向元素中心的配置
  cover?: React.ReactNode; // 展示的图片或者视频
  title: React.ReactNode; // 标题
  description?: React.ReactNode; //	主要描述部分
  placement?:
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
  onClose?: () => void; //	-	关闭引导时的回调函数
  mask?: boolean; //	true	是否启用蒙层，默认跟随 Tour 的 mask 属性
  type?: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
  nextButtonProps?: { children: React.ReactNode; onClick: () => void }; //	{ children: '下一步' }	下一步按钮的属性
  prevButtonProps?: { children: React.ReactNode; onClick: () => void }; //	{ children: '上一步' }	上一步按钮的属性
  className?: string;
  style?: React.CSSProperties;
}

const TourStep = (props: TourStepProps) => {
  const {
    steps,
    ariaId,
    target,
    arrow,
    cover,
    title,
    description,
    placement,
    onClose,
    onFinish,
    mask,
    type,
    nextButtonProps = <button>下一步</button>,
    prevButtonProps = <button>上一步</button>,
    finishButtonProps = <button>跳过</button>,
    className,
    style,
    prefixCls,
    closeIcon,
    rootClassName,
  } = props;
  console.log('title', title);
  const stepsLength = steps.length;
  const { currentStep, setCurrentStep } = useContext(TourContext);

  const closeContent = (btnType: string | undefined) => {
    setCurrentStep(-1);
    if (typeof onClose === 'function') {
      onClose();
    }
    if (btnType === 'finish' && typeof onFinish === 'function') {
      onFinish();
    }
  };

  const prevButtonNode: React.ReactNode = (
    <div
      className={`${prefixCls}-prevButton`}
      onClick={() => setCurrentStep(currentStep - 1)}
    >
      {prevButtonProps}
    </div>
  );

  const nextButtonNode: React.ReactNode = (
    <div
      className={`${prefixCls}-nextButton`}
      onClick={() => setCurrentStep(currentStep + 1)}
    >
      {nextButtonProps}
    </div>
  );

  const finishButtonNode: React.ReactNode = (
    <div
      className={`${prefixCls}-prevButton`}
      onClick={() => closeContent('finish')}
    >
      {finishButtonProps}
    </div>
  );

  let headerNode: React.ReactNode;
  if (title) {
    headerNode = (
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`} id={ariaId}>
          {title}
        </div>
      </div>
    );
  }

  let descriptionNode: React.ReactNode;
  if (description) {
    descriptionNode = (
      <div className={`${prefixCls}-description`} id={ariaId}>
        {description}
      </div>
    );
  }

  let coverNode: React.ReactNode;
  if (cover) {
    coverNode = (
      <div className={`${prefixCls}-cover`} id={ariaId}>
        {cover}
      </div>
    );
  }

  const closer: React.ReactNode = (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className={`${prefixCls}-close`}
    >
      {closeIcon || <span className={`${prefixCls}-close-x`} />}
    </button>
  );

  const slickNode: React.ReactNode =
    stepsLength > 1
      ? steps.map((item, index) => {
          const backgroundColor = index === currentStep ? 'blue' : '#8c8c8c';
          return (
            <div
              key={index}
              style={{
                display: 'inline-block',
                width: 2,
                height: 2,
                border: `1px solid ${backgroundColor}`,
                borderRadius: 2,
                backgroundColor: backgroundColor,
              }}
            />
          );
        })
      : null;

  return (
    <div
      className={classNames(`${prefixCls}-inner`, rootClassName)}
      role={prefixCls}
      style={{ minWidth: 200, ...style }}
    >
      <div className={`${prefixCls}-popContent`} style={style}>
        {closer}
        {coverNode}
        {headerNode}
        <div className={`${prefixCls}-description`}>{descriptionNode}</div>
        <div className={`${prefixCls}-footer`}>
          {slickNode}
          {currentStep !== 0 ? prevButtonNode : null}
          {currentStep === stepsLength - 1 ? finishButtonNode : nextButtonNode}
        </div>
      </div>
    </div>
  );
};

export default TourStep;
