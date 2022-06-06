import React from "react";

const announcer = ({ message }) => (
    <div role="region" aria-live="polite" className="visually-hidden">
        {message}
    </div>
);

export default announcer;