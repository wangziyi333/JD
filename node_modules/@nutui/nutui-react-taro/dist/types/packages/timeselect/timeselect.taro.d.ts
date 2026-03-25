import { FunctionComponent, ReactNode } from 'react';
import { BasicComponent } from '../../utils/typings';
export interface TimeType {
    value?: string;
    text?: string;
    [prop: string]: any;
}
export interface DateType {
    value?: string;
    text?: string;
    children?: TimeType[];
    [prop: string]: any;
}
export interface OptionKeyType {
    valueKey: string;
    textKey: string;
    childrenKey: string;
}
export interface TimeSelectProps extends BasicComponent {
    /**
    * 是否显示弹层
    * @default false
    */
    visible: boolean
    /**
    * 是否支持多选
    * @default false
    */
    multiple?: boolean
    /**
    * 弹层标题
    * @default 取件时间
    */
    title?: ReactNode
    /**
    * 默认选中的值，非受控
    * @default -
    */
    defaultValue: DateType[]
    /**
    * 数据
    * @default -
    */
    options: DateType[]
    /**
    * 配置数据中的关键字, valueKey, textKey, childrenKey
    * @default -
    */
    optionKey: OptionKeyType
    /**
    * 关闭遮罩之后的回调
    * @default -
    */
    onSelect?: (value: DateType[]) => void
    /**
    * 点击左栏时的回调
    * @default -
    */
    onDateChange?: (date: DateType, value: DateType[]) => void
    /**
    * 点击右侧选项时的回调
    * @default -
    */
    onTimeChange?: (time: TimeType, value: DateType[]) => void
}
export declare const TimeSelect: FunctionComponent<Partial<TimeSelectProps>>;
