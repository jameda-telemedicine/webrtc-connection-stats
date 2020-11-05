import { TypeInterface } from './type-interface';
import { IceCandidatePair, Stats } from '../../entity/stats';
import { CandidateUtils } from '../utils/candidate-utils';

export class CandidatePair implements TypeInterface {

    private pairs: IceCandidatePair[] = [];
    private hasGoogleStatsAPI = false;

    constructor() {
    }

    public getStats(candidatePair, payload: Stats): Stats {
        let newStats = payload;
        const successfulCandidate = typeof candidatePair.selected !== 'undefined'
            ? candidatePair.state === 'succeeded' && candidatePair.nominated && candidatePair.selected
            : candidatePair.state === 'succeeded' && candidatePair.nominated;

        if (successfulCandidate && !this.hasGoogleStatsAPI) {
            newStats = this.extractConnectionData(candidatePair, newStats);
        }
        newStats.iceCandidatePairs = this.createPairs(candidatePair);
        return newStats;

    }

    /**
     * Legacy stats report
     *
     * availableOutgoingBitrate: 1256211
     * bytesReceived: 2408777
     * bytesSent: 1594979
     * consentRequestsSent: 11
     * currentRoundTripTime: 0.024
     * id: "RTCIceCandidatePair_GaSfFI1+_/zGp0akx"
     * localCandidateId: "RTCIceCandidate_GaSfFI1+"
     * nominated: true
     * priority: 9115038255631187000
     * remoteCandidateId: "RTCIceCandidate_/zGp0akx"
     * requestsReceived: 12
     * requestsSent: 1
     * responsesReceived: 12
     * responsesSent: 12
     * state: "succeeded"
     * timestamp: 1574269784024.547
     * totalRoundTripTime: 0.332
     * transportId: "RTCTransport_0_1"
     * type: "candidate-pair"
     * writable: true
     *
     * @param report
     * @param candidatePair
     */
    public getStatsFromGoogleApi(report: any, candidatePair: Stats) {
        this.hasGoogleStatsAPI = true;
        return this.extractConnectionData(report, candidatePair);
    }

    /**
     * @param candidatePair
     * @param stats
     */
    private extractConnectionData(candidatePair, stats: Stats): Stats {
        stats.timestamp = Math.trunc(candidatePair.timestamp);
        stats.localCandidateId = candidatePair.localCandidateId;
        stats.remoteCandidateId = candidatePair.remoteCandidateId;
        stats.bytesSentInterval = candidatePair.bytesSent - stats.bytesSent;
        stats.bytesReceivedInterval = candidatePair.bytesReceived - stats.bytesReceived;
        stats.bytesSent = candidatePair.bytesSent;
        stats.bytesReceived = candidatePair.bytesReceived;
        stats.avgThroughputInterval = (stats.bytesSentInterval + stats.bytesReceivedInterval) / (stats.interval / 1000);
        return stats;
    }

    private createPairs(report): IceCandidatePair[] {
        this.pairs.push({
            id: report.id,
            localCandidateId: report.localCandidateId,
            remoteCandidateId: report.remoteCandidateId,
            state: report.state,
            nominated: report.nominated,
            priority: CandidateUtils.stringFormatPriority(report.priority),
            selected: (typeof report.selected !== 'undefined') ? report.selected : null
        });

        return this.pairs;
    }
}
