import { TypeInterface } from './type-interface';
import { IceCandidate, Stats } from '../../entity/stats';
import { CandidateUtils } from '../utils/candidate-utils';

export class RemoteCandidate implements TypeInterface {

    private iceCandidates: IceCandidate[] = [];

    public getStats(report, payload: Stats): Stats {
        const myPayload = payload;

        if (myPayload.remoteCandidateId === report.id) {
            if (report.address) {
                myPayload.remoteIp = report.address;
            }
            if (report.ip) {
                myPayload.remoteIp = report.ip;
            }
            myPayload.remotePort = report.port;
            myPayload.remoteProtocol = report.protocol;
            myPayload.remoteCandidateType = report.candidateType;
        }

        myPayload.remoteIceCandidates = this.createIceCandidates(report);
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
