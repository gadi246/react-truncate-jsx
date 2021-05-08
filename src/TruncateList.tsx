import React from 'react';
import context from './TruncateContext';
import TruncateItem from './TruncateItem';

type EllipsisProps = {moreCount: number; moreChildren:[React.ReactNode]}
interface TruncateListProps{
    children: JSX.Element | JSX.Element[],
    ellipsis: EllipsisProps & React.ComponentPropsWithRef<any>,
}

function TruncateList({children, ellipsis: Ellipsis}:TruncateListProps): JSX.Element{
    const {truncateIndex, observer, isTruncating} = React.useContext(context);
    if(!isTruncating) return <>{children}</>;
    return(
        <>
            {React.Children.map(children, (child, index) => {
                return truncateIndex !== null ? index < truncateIndex && child : (
                    <TruncateItem id={index} observer={observer}>
                        {child}
                    </TruncateItem>
                )

            })
            }
            {truncateIndex && Ellipsis && (
                <TruncateItem id={`ellipsis-${truncateIndex}`} observer={observer}>
                    <Ellipsis moreCount={React.Children.count(children) - truncateIndex} moreChildren={React.Children.toArray(children).slice(truncateIndex)} />
                </TruncateItem>
            )}
        </>
    )
}

export default TruncateList
