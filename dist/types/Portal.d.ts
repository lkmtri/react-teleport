import React from 'react';
interface PortalProps {
    channel: string;
    children: React.ReactNode;
}
declare const Portal: ({ channel, children }: PortalProps) => React.ReactPortal | null;
export default Portal;
