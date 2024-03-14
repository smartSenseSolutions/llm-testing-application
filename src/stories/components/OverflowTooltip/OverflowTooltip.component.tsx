import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from '../Tooltip';

type OverflowTipProp = {
    children: JSX.Element;
    title: string;
};

const OverflowToolTip = ({ children, title }: OverflowTipProp): JSX.Element => {
    const [isOverflow, setIsOverflow] = useState(false);
    const elementRef = useRef<HTMLDivElement | undefined>(undefined);
    const child = React.cloneElement(children, { ref: elementRef });

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined = undefined;
        if (elementRef.current && elementRef.current?.scrollWidth && elementRef.current?.clientWidth) {
            interval = setTimeout(() => {
                if (elementRef.current) setIsOverflow(elementRef.current.scrollWidth > elementRef.current.clientWidth);
            }, 500);
        }
        return () => {
            if (elementRef && elementRef.current) {
                clearTimeout(interval);
            }
        };
    }, [child, elementRef?.current?.clientWidth]);

    return (
        <Tooltip title={title} disableHoverListener={!isOverflow}>
            {child}
        </Tooltip>
    );
};

export { OverflowToolTip };
