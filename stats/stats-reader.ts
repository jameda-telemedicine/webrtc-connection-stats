import { Stats, StatsBrowser } from '../entity/stats';
import { TypeReport } from './type/type-report';

export class StatsReader {

    public getStats(connection: RTCPeerConnection, presentationData: Stats): Promise<Stats> {
        presentationData = this.annotateStatsData(connection, presentationData);
        if (presentationData.connection === true) {
            const typeReport = new TypeReport();
            const standardStatsPromise: Promise<any> = connection.getStats(null);

            return this.getLegacyStats(connection)
                .then((legacyStats) => {
                    presentationData = this.extractedLegacyReports(legacyStats, presentationData, typeReport);
                    return standardStatsPromise;
                })
                .then((stats) => {
                    presentationData = this.extractedReports(stats, presentationData, typeReport);
                    return presentationData;
                })
                .catch((error) => {
                    presentationData.connection = false; // usually triggered by Firefox...
                    return presentationData;
                });
        } else {
            return new Promise(function (resolve) {
                resolve(presentationData);
            });
        }
    }

    private getLegacyStats(connection: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // Single-parameter callback-based getStats() (non-standard)
            (<any>connection).getStats((legacyData) => {
                resolve(legacyData);
            }).catch(() => {
                resolve({
                    result: () => []
                });
            });
        });
    }

    private extractedReports(stats, presentationData: Stats, typeReport) {
        (<any>stats).forEach((report) => {
            if (report.type !== 'codec') {
                presentationData = typeReport.getStats(report, presentationData);
            }
        });
        return presentationData;
    }

    private extractedLegacyReports(legacyStats: any, presentationData: Stats, typeReport: TypeReport) {
        legacyStats.result().forEach((report) => {
            presentationData = typeReport.getStats(report, presentationData);
        });
        return presentationData;
    }

    private annotateStatsData(connection: RTCPeerConnection, presentationData: Stats): Stats {
        presentationData.userAgent = navigator.userAgent;
        presentationData.likelyBrowser = this.guessBrowser(navigator.userAgent);

        (<any>connection).connectionState
            ? presentationData.connection = ((<any>connection).connectionState === 'connected')
            : presentationData.connection = true;

        presentationData.connectionState = (<any>connection).connectionState;
        return presentationData;
    }

    private guessBrowser(userAgent: string): StatsBrowser {
        if (userAgent.search('Firefox/') > 1) {
            return 'Firefox';
        }
        if (userAgent.search('Chrome/') > 1 && userAgent.search('Safari/') > 1) {
            return 'Chrome';
        }
        if (userAgent.search('Chrome/') < 0 && userAgent.search('Safari/') > 1) {
            return 'Safari';
        }
        return 'unknown';
    }
}
