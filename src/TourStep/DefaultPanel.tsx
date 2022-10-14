import * as React from 'react';
import type { TourStepProps } from '.';

export default function DefaultPanel(props: TourStepProps) {
  const {
    prefixCls,
    current,
    total,
    title,
    description,
    onClose,
    onPrev,
    onNext,
    onFinish,
  } = props;

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`${prefixCls}-close`}
      >
        <span className={`${prefixCls}-close-x`} />
        <span role="img" aria-label="close">
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
        <div className={`${prefixCls}-sliders`}>
          {total > 1
            ? [...Array.from({ length: total }).keys()].map((item, index) => {
                return (
                  <span
                    key={item}
                    className={index === current ? 'active' : ''}
                  />
                );
              })
            : null}
        </div>
        <div className={`${prefixCls}-buttons`}>
          {current !== 0 ? (
            <div className={`${prefixCls}-prevBtn`} onClick={onPrev}>
              <button className="ant-btn">上一步</button>
            </div>
          ) : null}
          {current === total - 1 ? (
            <div className={`${prefixCls}-finishBtn`} onClick={onFinish}>
              <button className="ant-btn">结束引导</button>
            </div>
          ) : (
            <div className={`${prefixCls}-nextBtn`} onClick={onNext}>
              <button className="ant-btn">下一步</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}