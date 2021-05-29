declare type DestElementType = HTMLElement | null;
declare const _default: {
    registerDestElement: (channel: string, element: DestElementType) => () => void;
    subscribe: (channel: string, callback: (el: DestElementType) => void) => () => void;
};
export default _default;
