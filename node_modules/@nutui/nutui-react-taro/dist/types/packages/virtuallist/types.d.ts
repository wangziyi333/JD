export type Data = any;
export interface VirtualListState {
    startOffset: number;
    startIndex: number;
    overStart: number;
    endIndex: number;
}
export interface PositionType {
    index: number;
    top?: number;
    height?: number;
    bottom: number;
    width?: number;
    left?: number;
    right: number;
}
