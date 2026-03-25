import { FunctionComponent, ReactNode } from 'react';
import { BasicComponent } from '../../utils/typings';
export interface CellGroupProps extends BasicComponent {
    /**
    * 分组标题
    * @default -
    */
    title: ReactNode
    /**
    * 分组描述
    * @default -
    */
    description: ReactNode
    children?: ReactNode;
    /**
    * 单元格之间是否有分割线
    * @default true
    */
    divider: boolean
}
export declare const CellGroup: FunctionComponent<Partial<CellGroupProps>>;
