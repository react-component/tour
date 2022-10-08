import * as React from 'react';
import { useContext } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import TourContext from './context';
import classNames from 'classnames';
import type { placementType } from './placements';

export interface TourStepProps {
  prefixCls?: string;
  target: () => HTMLElement; //	获取引导卡片指向的元素
  arrow?: boolean | { pointAtCenter: boolean }; // 是否显示箭头，包含是否指向元素中心的配置
  cover?: ReactNode; // 展示的图片或者视频
  title: ReactNode; // 标题
  description?: ReactNode; //	主要描述部分
  placement?: placementType;
  onClose?: () => void; //	-	关闭引导时的回调函数arrow
  onFinish?: () => void;
  mask?: boolean; //	true	是否启用蒙层，默认跟随 Tour 的 mask 属性
  className?: string;
  style?: CSSProperties;
  stepsLength?: number;
  renderStep?: (current: number) => ReactNode;
}

const TourStep = (props: TourStepProps) => {
  const {
    title,
    description,
    className,
    style,
    prefixCls,
    stepsLength,
    renderStep,
  } = props;
  const { currentStep, setCurrentStep, setMergedMask, setOpen } =
    useContext(TourContext);

  const closeContent = () => {
    setOpen(false);
    setMergedMask(false);
  };

  const prevBtnClick = () => {
    setCurrentStep(currentStep - 1);
  };
  const nextBtnClick = () => {
    setCurrentStep(currentStep + 1);
  };

  const mergedSlickNode =
    (typeof renderStep === 'function' && renderStep(currentStep)) ||
    [...Array.from({ length: stepsLength }).keys()].map((item, index) => {
      return (
        <span key={item} className={index === currentStep ? 'active' : ''} />
      );
    });
  const slickNode: ReactNode = stepsLength > 1 ? mergedSlickNode : null;

  const mergedClassName = classNames(`${prefixCls}-inner`, className);

  return (
    <div className={mergedClassName} role={prefixCls} style={style}>
      <button
        type="button"
        onClick={() => closeContent()}
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
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`}>{title}</div>
      </div>
      <div className={`${prefixCls}-description`}>{description}</div>
      <div className={`${prefixCls}-footer`}>
        <div className={`${prefixCls}-sliders`}>{slickNode}</div>
        <div className={`${prefixCls}-buttons`}>
          {currentStep !== 0 ? (
            <div className={`${prefixCls}-prevButton`} onClick={prevBtnClick}>
              <button className="ant-btn ant-btn-primary">上一步</button>
            </div>
          ) : null}
          {currentStep === stepsLength - 1 ? (
            <div className={`${prefixCls}-prevButton`} onClick={closeContent}>
              <button className="ant-btn ant-btn-primary">结束引导</button>
            </div>
          ) : (
            <div className={`${prefixCls}-nextButton`} onClick={nextBtnClick}>
              <button className="ant-btn ant-btn-primary">下一步</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourStep;
