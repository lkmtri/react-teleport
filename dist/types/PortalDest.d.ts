import React from 'react';
interface PortalDestProps {
    channel: string;
    Container?: React.ElementType;
}
declare const PortalDest: ({ channel, Container, ...props }: PortalDestProps) => JSX.Element;
export default PortalDest;
