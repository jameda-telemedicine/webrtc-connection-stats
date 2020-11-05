import { Stats } from '../../entity/stats';
import { TypeInterface } from './type-interface';

export class OutboundRTP implements TypeInterface {

    public getStats(report, payload: Stats): Stats {
        return this.getReport(report, payload);
    }

    private getReport(report, payload: Stats): Stats {
        let type = '';
        if (report.mediaType) {
            type = report.mediaType;
        }

        if (report.kind) {
            type = report.kind;
        }
        const myPayload = payload;
        if (type === 'video' && report.timestamp !== payload.videoTimestamp) {
            myPayload.videoBitrate = this.getBitrate(report.timestamp, report.bytesSent, payload.videoTimestamp, payload.videoBytesSent);
            myPayload.videoBytesSent = report.bytesSent;
            myPayload.videoPacketsSent = report.packetsSent;
            myPayload.videoTimestamp = report.timestamp;
        }
        if (type === 'audio') {
            myPayload.audioBitrate = this.getBitrate(report.timestamp, report.bytesSent, payload.audioTimestamp, payload.audioBytesSent);
            myPayload.audioBytesSent = report.bytesSent;
            myPayload.audioPacketsSent = report.packetsSent;
            myPayload.audioTimestamp = report.timestamp;
        }

        myPayload.bitrate = myPayload.audioBitrate + myPayload.videoBitrate;
        return myPayload;
    }

    private getBitrate(now, bytes, prevTimestamp, prevBytesSent): number {
        // calculate bitrate
        if (prevTimestamp !== undefined
            && prevBytesSent !== undefined
            && prevBytesSent !== 0
            && bytes > prevBytesSent
            && (now - prevTimestamp) > 1
        ) {
            return 8000 * (bytes - prevBytesSent) / (now - prevTimestamp);
        } else {
            return 8 * bytes;
        }
    }
}
