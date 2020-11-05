import { Stats } from '../../entity/stats';

export interface TypeInterface {

    getStats(report, payload: Stats): Stats;
}