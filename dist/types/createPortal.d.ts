import React from 'react';
interface TargetProps {
    Container?: React.ElementType;
}
interface SourceProps {
    children: React.ReactNode;
    only?: boolean;
}
declare const createPortal: () => {
    Target: ({ Container }: TargetProps) => JSX.Element;
    Source: ({ children, only }: SourceProps) => React.ReactPortal | null;
};
export default createPortal;
