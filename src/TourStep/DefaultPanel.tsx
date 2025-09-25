import * as React from 'react';
import type { TourStepProps } from '../interface';
import classNames from 'classnames';
import pickAttrs from '@rc-component/util/lib/pickAttrs';

export type DefaultPanelProps = Exclude<TourStepProps, 'closable'> & {
  closable: Exclude<TourStepProps['closable'], boolean>;
};

export default function DefaultPanel(props: DefaultPanelProps) {
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
    classNames: tourClassNames,
    styles,
  } = props;
  const ariaProps = pickAttrs(closable || {}, true);
  const closeIcon = closable?.closeIcon ?? (
    <span className={`${prefixCls}-close-x`}>&times;</span>
  );
  const mergedClosable = !!closable;

  return (
    <div className={classNames(`${prefixCls}-pannel`, className)}>
      <div
        className={classNames(`${prefixCls}-section`, tourClassNames?.section)}
        style={styles?.section}
      >
        {mergedClosable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            {...ariaProps}
            className={classNames(`${prefixCls}-close`, tourClassNames?.close)}
            style={styles?.close}
          >
            {closeIcon}
          </button>
        )}
        <div
          className={classNames(`${prefixCls}-header`, tourClassNames?.header)}
          style={styles?.header}
        >
          <div
            className={classNames(`${prefixCls}-title`, tourClassNames?.title)}
            style={styles?.title}
          >
            {title}
          </div>
        </div>
        <div
          className={classNames(
            `${prefixCls}-description`,
            tourClassNames?.description,
          )}
          style={styles?.description}
        >
          {description}
        </div>
        <div
          className={classNames(`${prefixCls}-footer`, tourClassNames?.footer)}
          style={styles?.footer}
        >
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
          <div
            className={classNames(
              `${prefixCls}-actions`,
              tourClassNames?.actions,
            )}
            style={styles?.actions}
          >
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
