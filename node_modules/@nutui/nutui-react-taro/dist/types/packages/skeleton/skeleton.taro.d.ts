import { FunctionComponent } from 'react';
import { BasicComponent } from '../../utils/typings';
type avatarShape = 'round' | 'square';
export interface SkeletonProps extends BasicComponent {
    /**
    * 是否开启骨架屏动画
    * @default false
    */
    animated: boolean
    /**
    * 设置段落行数
    * @default 1
    */
    rows: number
    /**
    * 是否显示段落标题
    * @default true
    */
    title: boolean
    /**
    * 是否显示头像
    * @default false
    */
    avatar: boolean
    /**
    * 头像大小
    * @default 50px
    */
    avatarSize: string
    /**
    * 是否显示骨架屏(true不显示骨架屏，false显示骨架屏)
    * @default true
    */
    visible: boolean
    /**
    * 头像形状：正方形/圆形
    * @default round
    */
    avatarShape: avatarShape
}
export declare const Skeleton: FunctionComponent<Partial<SkeletonProps>>;
export {};
