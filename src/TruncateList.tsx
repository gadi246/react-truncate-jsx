import React, {forwardRef} from 'react';
import context from './TruncateContext';
import TruncateItem from './TruncateItem';

type EllipsisProps = { moreCount: number; moreChildren: [React.ReactNode] };
interface TruncateListProps {
  children: JSX.Element | JSX.Element[];
  ellipsis: EllipsisProps & React.ComponentPropsWithRef<any>;
}

export  declare type TagProps = { children: React.ReactNode };
export  declare type TagRef = HTMLDivElement;

function TruncateList({
  children,
  ellipsis: Ellipsis = forwardRef<TagRef, TagProps>((props, ref) => <div ref={ref} {...props}>...</div>),
}: TruncateListProps): JSX.Element {
  const { truncateIndex, observer, isTruncating, done } = React.useContext(context);
  if (!isTruncating) return <>{children}</>;
  return (
    <>
      {React.Children.map(children, (child, index) => {
        return truncateIndex !== null ? (
          index < truncateIndex && child
        ) : (
          <TruncateItem id={index} observer={observer}>
            {child}
          </TruncateItem>
        );
      })}
      {truncateIndex && Ellipsis && (
          <>
            {done ? (
                <Ellipsis
                    moreCount={React.Children.count(children) - truncateIndex}
                    moreChildren={React.Children.toArray(children).slice(truncateIndex)}
                />
            ) : (
                <TruncateItem id={`ellipsis-${truncateIndex}`} observer={observer}>
                  <Ellipsis
                      moreCount={React.Children.count(children) - truncateIndex}
                      moreChildren={React.Children.toArray(children).slice(truncateIndex)}
                  />
                </TruncateItem>
            )}
          </>
      )}
    </>
  );
}

export default TruncateList;
