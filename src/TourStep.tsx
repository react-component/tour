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
      {prevButtonProps?.children || (
        <button className="ant-btn ant-btn-primary">上一步</button>
      )}
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
      {nextButtonProps?.children || (
        <button className="ant-btn ant-btn-primary">下一步</button>
      )}
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
      {finishButtonProps?.children || (
        <button className="ant-btn ant-btn-primary">结束引导</button>
      )}
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
      <span
        role="img"
        aria-label="close"
        className="anticon anticon-close ant-modal-close-icon"
      >
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="close"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
        </svg>
      </span>
    </button>
  );

  const slickNode: React.ReactNode =
    stepsLength > 1
      ? [...Array.from({ length: stepsLength }).keys()].map((item, index) => {
          return (
            <span
              key={item}
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
