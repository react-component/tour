import * as React from 'react';
import { useContext } from 'react';
import TourContext from './context';
import classNames from 'classnames';
import type { placementType } from './placements';

export interface TourStepProps {
  prefixCls?: string;
  target: () => HTMLElement; //	获取引导卡片指向的元素
  arrow?: boolean | { pointAtCenter: boolean }; // 是否显示箭头，包含是否指向元素中心的配置
  cover?: React.ReactNode; // 展示的图片或者视频
  title: React.ReactNode; // 标题
  description?: React.ReactNode; //	主要描述部分
  placement?: placementType;
  onClose?: () => void; //	-	关闭引导时的回调函数
  onFinish?: () => void;
  mask?: boolean; //	true	是否启用蒙层，默认跟随 Tour 的 mask 属性
  type?: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
  nextButtonProps?: { children?: React.ReactNode; onClick?: () => void }; //	{ children: '下一步' }	下一步按钮的属性
  prevButtonProps?: { children?: React.ReactNode; onClick?: () => void }; //	{ children: '上一步' }	上一步按钮的属性
  finishButtonProps?: { children?: React.ReactNode; onClick?: () => void }; //	{ children: '上一步' }	上一步按钮的属性
  className?: string;
  style?: React.CSSProperties;
  rootClassName?: string;
  stepsLength?: number;
}

const TourStep = (props: TourStepProps) => {
  const {
    cover,
    title,
    description,
    onClose,
    onFinish,
    type,
    nextButtonProps = {
      children: <button>下一步</button>,
      onClick: () => {},
    },
    prevButtonProps = {
      children: <button>上一步</button>,
      onClick: () => {},
    },
    finishButtonProps = {
      children: <button>跳过</button>,
      onClick: () => {},
    },
    className,
    style,
    prefixCls,
    stepsLength,
    rootClassName,
  } = props;
  const { currentStep, setCurrentStep, setMergeMask } = useContext(TourContext);

  const closeContent = (btnType: string | undefined) => {
    setCurrentStep(-1);
    console.log('------', currentStep);

    if (typeof onClose === 'function') {
      onClose();
    }
    setMergeMask(false);
    if (btnType === 'finish' && typeof onFinish === 'function') {
      onFinish();
    }
  };

  const prevBtnClick = () => {
    setCurrentStep(currentStep - 1);
    if (typeof prevButtonProps.onClick === 'function') {
      prevButtonProps.onClick();
    }
  };
  const prevButtonNode: React.ReactNode = (
    <div className={`${prefixCls}-prevButton`} onClick={prevBtnClick}>
      {prevButtonProps?.children}
    </div>
  );

  const nextBtnClick = () => {
    setCurrentStep(currentStep + 1);
    if (typeof nextButtonProps.onClick === 'function') {
      nextButtonProps.onClick();
    }
  };

  const nextButtonNode: React.ReactNode = (
    <div className={`${prefixCls}-nextButton`} onClick={nextBtnClick}>
      {nextButtonProps?.children}
    </div>
  );

  const finishBtnClick = () => {
    closeContent('finish');
    if (typeof finishButtonProps.onClick === 'function') {
      finishButtonProps.onClick();
    }
  };

  const finishButtonNode: React.ReactNode = (
    <div className={`${prefixCls}-prevButton`} onClick={finishBtnClick}>
      {finishButtonProps?.children}
    </div>
  );

  let headerNode: React.ReactNode;
  if (title) {
    headerNode = (
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`}>{title}</div>
      </div>
    );
  }

  let descriptionNode: React.ReactNode;
  if (description) {
    descriptionNode = (
      <div className={`${prefixCls}-description`}>{description}</div>
    );
  }

  let coverNode: React.ReactNode;
  if (cover) {
    coverNode = <div className={`${prefixCls}-cover`}>{cover}</div>;
  }

  const closer: React.ReactNode = (
    <button
      type="button"
      onClick={() => closeContent('close')}
      aria-label="Close"
      className={`${prefixCls}-close`}
    >
      <span className={`${prefixCls}-close-x`} />
    </button>
  );

  const slickNode: React.ReactNode =
    stepsLength > 1
      ? new Array(stepsLength).map((item, index) => {
          return (
            <span
              key={index}
              className={index === currentStep ? 'active' : ''}
            />
          );
        })
      : null;

  const mergedClassName = classNames(
    `${prefixCls}-inner`,
    rootClassName,
    className,
    type === 'primary' ? `${prefixCls}-primary` : '',
  );

  return (
    <div className={mergedClassName} role={prefixCls} style={style}>
      {closer}
      {coverNode}
      {headerNode}
      <div className={`${prefixCls}-description`}>{descriptionNode}</div>
      <div className={`${prefixCls}-footer`}>
        <div className={`${prefixCls}-sliders`}>{slickNode}</div>
        <div className={`${prefixCls}-buttons`}>
          {currentStep !== 0 ? prevButtonNode : null}
          {currentStep === stepsLength - 1 ? finishButtonNode : nextButtonNode}
        </div>
      </div>
    </div>
  );
};

export default TourStep;
