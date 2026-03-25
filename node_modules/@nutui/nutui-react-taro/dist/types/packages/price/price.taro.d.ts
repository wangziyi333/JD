import { FunctionComponent } from 'react';
import { BasicComponent } from '../../utils/typings';
export interface PriceProps extends BasicComponent {
    /**
    * 价格数量
    * @default 0
    */
    price: number | string
    /**
    * 符号类型
    * @default &yen;
    */
    symbol: string
    /**
    * 小数位位数
    * @default 2
    */
    digits: number
    /**
    * 是否按照千分号形式显示
    * @default false
    */
    thousands: boolean
    /**
    * 符号显示在价格前或者后，before、after
    * @default before
    */
    position: string
    /**
    * 价格尺寸，large、normal、small
    * @default large
    */
    size: string
    /**
    * 是否划线价
    * @default false
    */
    line: boolean
}
export declare const Price: FunctionComponent<Partial<PriceProps>>;
