import { TypeInterface } from './type-interface';
import { IceCandidate, Stats } from '../../entity/stats';
import { CandidateUtils } from '../utils/candidate-utils';

export class LocalCandidate implements TypeInterface {

    private iceCandidates: IceCandidate[] = [];

    public getStats(report, payload: Stats): Stats {
        const myPayload = payload;
        if (myPayload.localCandidateId === report.id) {
            if (report.address) {
                myPayload.localIp = report.address;
            }
            if (report.ip) {
                myPayload.localIp = report.ip;
            }
            myPayload.localPort = report.port;
            myPayload.localProtocol = report.protocol;
            myPayload.localCandidateType = report.candidateType;
        }

        myPayload.localIceCandidates = this.createIceCandidates(report);
        return myPayload;
    }

    private createIceCandidates(report): IceCandidate[] {
        this.iceCandidates.push(
            {
                id: report.id,
                candidateType: report.candidateType,
                address: (report.ip) ? report.ip : report.address,
                port: report.port,
                priority: CandidateUtils.stringFormatPriority(report.priority),
                protocol: report.protocol,
                type: report.type
            }
        );

        return this.iceCandidates;
    }
}
