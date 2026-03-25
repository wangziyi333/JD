import { CascaderOption, CascaderConfig, CascaderFormat } from './types';
export declare const formatTree: (tree: CascaderOption[], parent: CascaderOption | null, config: CascaderConfig) => CascaderOption[];
export declare const eachTree: (tree: CascaderOption[], cb: (node: CascaderOption) => unknown) => void;
export declare const convertListToOptions: (list: CascaderOption[], options: CascaderFormat) => CascaderOption[];
