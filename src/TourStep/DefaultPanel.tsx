import * as React from 'react';
import type { TourStepProps } from '.';
import classNames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';

type CloseNoBoolean =  Exclude<TourStepProps["closable"], boolean>;

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
    className,
    closable,
  } = props;
  const ariaProps = pickAttrs((closable as CloseNoBoolean) || {}, true);
  const closeIcon = (closable as CloseNoBoolean)?.closeIcon;
  const mergedClosable = !!closable;

  return (
    <div className={classNames(`${prefixCls}-content`, className)}>
      <div className={`${prefixCls}-inner`}>
        {mergedClosable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            {...ariaProps}
            className={`${prefixCls}-close`}
          >
            {closeIcon}
          </button>
        )}
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
              <button className={`${prefixCls}-prev-btn`} onClick={onPrev}>
                Prev
              </button>
            ) : null}
            {current === total - 1 ? (
              <button className={`${prefixCls}-finish-btn`} onClick={onFinish}>
                Finish
              </button>
            ) : (
              <button className={`${prefixCls}-next-btn`} onClick={onNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
