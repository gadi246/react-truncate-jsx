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
  const [done, setDone] = useState(false);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if(!(entry.target instanceof HTMLElement)) return;

          const { observeIndex = '' } = entry.target.dataset;
          if (
            entry.isIntersecting &&
            entry.intersectionRatio < 1
          ) {
            if (observeIndex.includes('ellipsis')) {
              setTruncateIndex((prev: number) => prev - 1);
            } else {
              setTruncateIndex(parseInt(observeIndex));
            }
          }

          if( entry.isIntersecting &&
              entry.intersectionRatio === 1 &&
              observeIndex.includes('ellipsis')
          ) {
            setDone(true);
          }

            // in case no intersection even though elements are overflowing
          if (!entry.isIntersecting) {
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
    setDone(false);
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
    done
  };

  return <Provider value={context}>{newWrapper}</Provider>;
}

export default Truncate;
