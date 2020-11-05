import { TypeInterface } from './type-interface';
import { Stats } from '../../entity/stats';

export class InboundRTP implements TypeInterface {

    public getStats(report, payload: Stats): Stats {
        const myPayload = payload;

        if (report.mediaType === 'video') {
            myPayload.videoBytesReceived = report.bytesReceived;
            myPayload.videoPacketsReceived = report.packetsReceived;
            myPayload.videoPacketsLost = report.packetsLost;
            myPayload.videoJitter = (report.jitter === undefined) ? 0 : report.jitter;
        }
        if (report.mediaType === 'audio') {
            myPayload.audioBytesReceived = report.bytesReceived;
            myPayload.audioPacketsReceived = report.packetsReceived;
            myPayload.audioPacketsLost = report.packetsLost;
            myPayload.audioJitter = (report.jitter === undefined) ? 0 : report.jitter;
        }

        return myPayload;
    }
}
