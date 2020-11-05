import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromWebrtcConnection from './store/webrtc-connection.reducer';
import { ConnectionListenerService, ConnectionStatsService, MonitoringService, StatsService } from './';
import { StoreModule } from '@ngrx/store';
import { HttpModule } from '../../http/http.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        StoreModule.forFeature('webrtcConnection', fromWebrtcConnection.reducer),
    ],
    declarations: [],
    providers: [ConnectionStatsService, StatsService, MonitoringService, ConnectionListenerService],
})
export class WebrtcConnectionStatsModule {
}
