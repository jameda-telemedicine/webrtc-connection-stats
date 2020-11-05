export function renderDiagnostics(presentationData) {
    const bytesToMB = 0.00000095367432;
    const fixedDecimalPlaces = 2;

    return `<h3>Diagnostics</h3>\n<strong>Time:</strong> ${presentationData.timestamp}<br>\n` +
        `<strong>User Agent (browser):</strong> ${presentationData.userAgent}<br>\n` +
        `<strong>Likely Browser:</strong> ${presentationData.likelyBrowser}<br>\n` +
        `<strong>Report Interval:</strong> ${presentationData.interval} ms<br>\n` +
        `<br><h4>Conference Data:</h4>\n` +
        `<strong>Appointment ID:</strong> ${presentationData.appointmentId}<br>\n` +
        `<strong>Profile ID:</strong> ${presentationData.profileId}<br>\n` +
        `<strong>Profile Type:</strong> ${presentationData.profileType}<br>\n` +
        `<br><h4>Connection:</h4>\n` +
        `<strong>Sender IP:</strong> ${presentationData.localIp}:${presentationData.localPort} - ${presentationData.localCandidateType}: ${presentationData.localProtocol}<br>\n` +
        `<strong>Receiver IP:</strong> ${presentationData.remoteIp}:${presentationData.remotePort} - ${presentationData.remoteCandidateType}: ${presentationData.remoteProtocol}<br>\n` +
        `<strong>Total Bytes Sent:</strong> ${(presentationData.bytesSent * bytesToMB).toFixed(fixedDecimalPlaces)} MB<br>\n` +
        `<strong>Total Bytes Received:</strong> ${(presentationData.bytesReceived * bytesToMB).toFixed(fixedDecimalPlaces)} MB<br>\n` +
        `<strong>Interval Bytes Sent:</strong> ${(presentationData.bytesSentInterval * bytesToMB).toFixed(fixedDecimalPlaces)} MB<br>\n` +
        `<strong>Interval Bytes Received:</strong> ${(presentationData.bytesReceivedInterval * bytesToMB).toFixed(fixedDecimalPlaces)} MB<br>\n` +
        `<strong>Average Throughput:</strong> ${(presentationData.avgThroughputInterval * bytesToMB).toFixed(fixedDecimalPlaces)} MB/sec<br>\n` +
        `<br><h4>Video:</h4>\n` +
        `<strong>Video Bytes Sent:</strong> ${(presentationData.videoBytesSent *bytesToMB).toFixed(fixedDecimalPlaces)} MB<br>\n` +
        `<strong>Video Bytes Received:</strong> ${(presentationData.videoBytesReceived * bytesToMB).toFixed(fixedDecimalPlaces)} MB<br>\n` +
        `<strong>Video Packets Sent:</strong> ${presentationData.videoPacketsSent}<br>\n` +
        `<strong>Video Packets Received:</strong> ${presentationData.videoPacketsReceived}<br>\n` +
        `<strong>Video Packets Lost:</strong> ${presentationData.videoPacketsLost}<br>\n` +
        `<br><h4>Audio:</h4>\n` +
        `<strong>Audio Bytes Sent:</strong> ${(presentationData.audioBytesSent * bytesToMB).toFixed(fixedDecimalPlaces)} MB<br>\n` +
        `<strong>Audio Bytes Received:</strong> ${(presentationData.audioBytesReceived * bytesToMB).toFixed(fixedDecimalPlaces)} MB<br>\n` +
        `<strong>Audio Packets Sent:</strong> ${presentationData.audioPacketsSent}<br>\n` +
        `<strong>Audio Packets Received:</strong> ${presentationData.audioPacketsReceived}<br>\n` +
        `<strong>Audio Packets Lost:</strong> ${presentationData.audioPacketsLost}<br>\n`;

}
