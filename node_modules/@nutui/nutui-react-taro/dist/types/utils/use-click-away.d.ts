type TargetType = Function | HTMLElement | Element;
export default function useClickAway(onClickAway: () => void, target: TargetType | TargetType[], eventName: string | undefined, useCapture: boolean, isListener?: boolean, outerVar?: boolean): void;
export {};
