import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React from 'react';

export const tooltip = (tooltip_title) => (
    <Tooltip>
        {tooltip_title}
    </Tooltip>
)

export const overlayTrigger = (placement, delay, overlay,trigger) => (
    <OverlayTrigger 
        placement={placement}
        delay={delay}
        overlay={overlay}
    >
        {trigger}
    </OverlayTrigger>
);

