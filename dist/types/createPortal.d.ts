import React from 'react';
interface TargetProps {
    Container?: React.ElementType;
}
interface SourceProps {
    children: React.ReactNode;
}
declare const createPortal: () => {
    Target: ({ Container }: TargetProps) => JSX.Element;
    Source: ({ children }: SourceProps) => React.ReactPortal | null;
};
export default createPortal;
