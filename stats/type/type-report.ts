import { OutboundRTP } from './outbound-rtp';
import { InboundRTP } from './inbound-rtp';
import { RemoteCandidate } from './remote-candidate';
import { LocalCandidate } from './local-candidate';
import { CandidatePair } from './candidate-pair';
import { Stats } from '../../entity/stats';
import { TypeInterface } from './type-interface';

export class TypeReport implements TypeInterface {

    private outboundRTP: OutboundRTP;
    private inboundRTP: InboundRTP;
    private remoteCandidate: RemoteCandidate;
    private localCandidate: LocalCandidate;
    private candidatePair: CandidatePair;

    constructor() {
        this.outboundRTP = new OutboundRTP();
        this.inboundRTP = new InboundRTP();
        this.remoteCandidate = new RemoteCandidate();
        this.localCandidate = new LocalCandidate();
        this.candidatePair = new CandidatePair();
    }

    public getStats(report, payload: Stats): Stats {
        switch (report.type) {
            case 'outbound-rtp'     :
                return this.outboundRTP.getStats(report, payload);
            case 'inbound-rtp'      :
                return this.inboundRTP.getStats(report, payload);
            case 'remote-candidate' :
                return this.remoteCandidate.getStats(report, payload);
            case 'local-candidate'  :
                return this.localCandidate.getStats(report, payload);
            case 'candidate-pair'   :
                return this.candidatePair.getStats(report, payload);
            case 'googCandidatePair': {
                return this.getGoogCandidatePair(report, payload);
            }
            default                 :
                return payload;
        }
    }

    private getGoogCandidatePair(report: any, payload: Stats): Stats {
        if (report.id.indexOf('Conn-audio') === 0) {
            return this.candidatePair.getStatsFromGoogleApi(report, payload);
        } else {
            return payload;
        }
    }
}
