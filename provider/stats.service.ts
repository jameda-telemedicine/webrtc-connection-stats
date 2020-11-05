import {Injectable} from '@angular/core';
import {MonitoringService} from './monitoring.service';
import {ConnectionListenerService} from './connection-listener.service';
import {ConnectionStatsService} from './connection-stats.service';
import {take} from 'rxjs/operators';
import {Stats} from '../entity/stats';
import {SchedulerListener} from '../../../modules/webrtc/provider/scheduler/scheduler.service';
import {version} from '../../../modules/utils/version';
import {StatsReader} from '../stats/stats-reader';

@Injectable()
export class StatsService implements SchedulerListener {

    private __INTERVAL = 1000;
    private statsData: Stats;
    private appVersion = version.version;

    constructor(
        private connectionListener: ConnectionListenerService,
        private monitoringService: MonitoringService,
        private connectionStats: ConnectionStatsService) {
    }

    /**
     * @override SchedulerListener
     */
    public doSchedule(connection: RTCPeerConnection): void {
        const statsReader = new StatsReader();
        if (this.statsData !== undefined) {
            (statsReader.getStats(connection, this.statsData)).then(data => {
                // this.monitoringService.postMetrics(data).pipe(take(1)).subscribe();
                this.connectionStats.setLocalBandwidth(data.bitrate);
            });
        }
    }

    /**
     * @override SchedulerListener
     */
    public startSchedule(): void {
        this.connectionListener.getData()
            .pipe(take(1)).subscribe((data) => {
            this.statsData = <Stats>{
                ...data,
                interval: this.__INTERVAL,
                version: this.appVersion
            };
        });
    }

    /**
     * @override SchedulerListener
     */
    public stopSchedule(): void {
        this.statsData = undefined;
    }
}
