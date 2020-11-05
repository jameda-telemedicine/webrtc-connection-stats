import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {UpdateWebrtcConnection} from '../store/webrtc-connection.actions';
import * as webrtcConnectionReducer from '../store/webrtc-connection.reducer';
import {WebrtcConnection, WebrtcConnectionStats} from '..';
import {Update} from '@ngrx/entity/src/models';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class ConnectionStatsService {

    constructor(private store: Store<WebrtcConnection>) {
    }

    public setLocalBandwidth(bandwidth: number): void {
        this.store.dispatch(this.buildUpdateAction('local', bandwidth));
    }

    public setPeerBandwidth(bandwidth: number): void {
        this.store.dispatch(this.buildUpdateAction('remote', bandwidth));
    }

    public getLocalBandwidth(): Observable<number> {
        return this.store.select(webrtcConnectionReducer.selectLocalWebrtcConnection).pipe(
            map((wc) => {
                return wc.bandwidth;
            })
        );
    }

    public getRemoteBandwidth(): Observable<number> {
        return this.store.select(webrtcConnectionReducer.selectRemoteWebrtcConnection).pipe(
            map((wc) => {
                return wc.bandwidth;
            })
        );
    }

    public getRemoteStats(): Observable<WebrtcConnectionStats> {
        return this.getRemoteBandwidth().pipe((map((bandwidth) => <WebrtcConnectionStats>{bandwidth})));
    }

    public getLocalStats(): Observable<WebrtcConnectionStats> {
        return this.getLocalBandwidth().pipe((map((bandwidth) => <WebrtcConnectionStats>{bandwidth})));
    }

    private buildUpdateAction(id: 'local' | 'remote', bandwidth: number): UpdateWebrtcConnection {
        const changes = <WebrtcConnection>{
            id,
            bandwidth
        };

        return new UpdateWebrtcConnection({
            webrtcConnection: <Update<WebrtcConnection>>{
                id,
                changes
            }
        });
    }
}
