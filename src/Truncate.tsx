import React, { useEffect, useRef, useMemo, useState } from 'react';
import context from './TruncateContext';
import { TruncateContextInterface } from './TruncateContext';

export interface TruncateProps {
  children: React.ReactElement;
  isTruncating: boolean;
}

const { Provider } = context;

function Truncate({ children, isTruncating = true }: TruncateProps) {
  const ref = useRef();
  const [truncateIndex, setTruncateIndex] = useState<number | null>(null);
  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio < 1 &&
            entry.target instanceof HTMLElement
          ) {
            const { observeIndex = '' } = entry.target.dataset;
            if (observeIndex.includes('ellipsis')) {
              setTruncateIndex((prev: number) => prev - 1);
            } else {
              setTruncateIndex(parseInt(observeIndex));
            }
          }
          if (!entry.isIntersecting && entry.target instanceof HTMLElement) {
            const { observeIndex = '' } = entry.target.dataset;
            setTruncateIndex((prev) => {
              return prev === null ? parseInt(observeIndex) - 1 : prev;
            });
          }
        });
      },
      {
        root: ref.current,
        rootMargin: '0px',
      }
    );
  }, []);

  useEffect(() => {
    setTruncateIndex(null);
  }, [children]);

  const wrapper = React.Children.only(children);
  const newWrapper = React.cloneElement(wrapper, {
    style: {
      ...wrapper.props.style,
      ...(isTruncating ? { overflow: 'hidden', flexWrap: 'nowrap' } : {}),
    },
    ref,
  });

  const context: TruncateContextInterface = {
    observer,
    truncateIndex,
    isTruncating,
  };
  return <Provider value={context}>{newWrapper}</Provider>;
}

export default Truncate;
