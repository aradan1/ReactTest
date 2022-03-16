import React, { useRef, useState } from "react";

import './Collapsible.css'


export default function Collapsible(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const ref = useRef();

    // max height to expand to, 5000 to never hit
    const maxHeight = props.height || 5000;

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };
    React.useEffect(() => {
        setIsOpen(props.isOpen)
    }, [props.isOpen])

    React.useEffect(() => {
        if (!height || !isOpen || !ref.current) return undefined;
        const resizeObserver = new ResizeObserver((el) => {
            setHeight(Math.min(el[0].contentRect.height, maxHeight));
        });
        resizeObserver.observe(ref.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, [height, isOpen, maxHeight]);

    React.useEffect(() => {
        if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
        else setHeight(0);
    }, [isOpen]);

    return (
        <div className="collapsible-card" onClick={handleFilterOpening}>
            <div>
                <div className="collapsible-header">
                    {props.children[0]}
                </div>
            </div>
            
            <div className="collapsible-content" style={{ height }}>
                <div ref={ref}>
                    {isOpen && <div>
                        {props.children.slice(1)}
                    </div>}
                </div>
            </div>
        </div>
    );
}