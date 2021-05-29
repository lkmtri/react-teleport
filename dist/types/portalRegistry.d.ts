declare type DestElement = HTMLElement | null;
declare const _default: {
    registerDestElement: (channel: string, element: DestElement) => () => void;
    subscribe: (channel: string, callback: (el: DestElement) => void) => () => void;
};
export default _default;
