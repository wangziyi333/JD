import { FunctionComponent } from 'react';
import { BasicComponent } from '../../utils/typings';
export interface CountUpProps extends BasicComponent {
    length: number;
    value: string;
    delay?: number;
    duration: number;
    thousands: boolean;
}
export declare const CountUp: FunctionComponent<Partial<CountUpProps>>;
