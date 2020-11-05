import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Stats } from '../entity/stats';
import {Observable} from 'rxjs';

@Injectable()
export class MonitoringService {

    constructor(private http: HttpClient) {
    }

    public postMetrics(data: Stats): Observable<any> {
        const sendDate = {...data};
        return this.http.post(environment.webrtcLoggingEndpoint, sendDate);
    }

}
