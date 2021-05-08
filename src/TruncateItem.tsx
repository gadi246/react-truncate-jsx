import React, {useRef, useEffect} from 'react';

interface TruncateItemProps{
    children: React.ReactElement,
    id:string | number,
    observer:IntersectionObserver
}

function TruncateItem({children, id, observer}:TruncateItemProps){
    const ref = useRef<HTMLElement>();
    useEffect(() => {
        const node = ref.current;
        if(node && observer){
            observer.observe(node)
        }
        return () => {
            if(node && observer){
                observer.unobserve(node)
            }
        }
    }, [id, observer])

    const child = React.Children.only(children);
    return  React.cloneElement(child, {ref, 'data-observe-index': id});
}

export default TruncateItem
