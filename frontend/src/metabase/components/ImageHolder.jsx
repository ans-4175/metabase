import React from "react";

const ImageHolder = ({ heightVal = 40, src, children, ...props }) => (
    <a
        href={src}
        className={"link"}
        // open in a new tab
        target="_blank"
        // prevent malicious pages from navigating us away
        rel="noopener"
        // disables quickfilter in tables
        onClickCapture={e => e.stopPropagation()}
    >
        <img
            style={{ height: heightVal }}
            src={src}
            {...props}
        />
    </a>
);

export default ImageHolder;
