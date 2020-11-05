import { formulatePresentationData } from './statsTypes';

// NOTE: This service is still an early prototype. This current iteration does 3 basic things:
// 1) Tracks the entire payload of connection.getStats() - ${fullPayload} - to send to monitoring at some future time
// 2) Filters the the connection.getStats() - ${presentationData} - for a subset of data to send to monitoring
// 3) Renders a rudimentary diagnostics window to the DOM (#statistics-block) using presentationData (don't use live)
// TODO: Still need to connect this to an API Endpoint for monitoring. May require further refactoring.

export function GetStats(connection, presentationData) {
    presentationData.userAgent = navigator.userAgent;
    presentationData.likelyBrowser = guessBrowser(navigator.userAgent);
    connection.connectionState
        ? presentationData.connection = (connection.connectionState === 'connected')
        : presentationData.connection = true;

    presentationData.connectionState = connection.connectionState;

    if(presentationData.connection === true) {
        return connection.getStats(null).then(stats => {
            stats.forEach(report => {
                if (report.type !== 'codec') {
                    presentationData = formulatePresentationData(report, presentationData);
                }
            });
            return presentationData;
        }).catch((error) => {
            presentationData.connection = false;// usually triggered by Firefox...
            return presentationData;
        });
    } else {
        return new Promise(function(resolve) {
            resolve({});
        });
    }

    function guessBrowser (userAgent) {
        if (userAgent.search('Firefox/') > 1 ) { return 'Firefox'; }
        if (userAgent.search('Chrome/') > 1 && userAgent.search('Safari/') > 1 ) { return 'Chrome'; }
        if (userAgent.search('Chrome/') < 0 && userAgent.search('Safari/') > 1 ) { return 'Safari'; }
        return 'unknown';
    }

    return(presentationData);
}
