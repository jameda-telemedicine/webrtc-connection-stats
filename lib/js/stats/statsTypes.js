export function formulatePresentationData(report, payload) {
    switch (report.type) {
        case 'outbound-rtp'     :
            return OutboundRTP(report, payload);
        case 'inbound-rtp'      :
            return InboundRTP(report, payload);
        case 'remote-candidate' :
            return RemoteCandidate(report, payload);
        case 'local-candidate'  :
            return LocalCandidate(report, payload);
        case 'candidate-pair'   :
            return CandidatePair(report, payload);
        default                 :
            return payload;
    }
}

function OutboundRTP(report, payload) {
    let myPayload = payload ;

    if (report.kind === 'video' && report.timestamp !== payload.videoTimestamp) {
        myPayload.videoBitrate = getBitrate(report.timestamp, report.bytesSent, payload.videoTimestamp, payload.videoBytesSent);
        myPayload.videoBytesSent = report.bytesSent;
        myPayload.videoPacketsSent = report.packetsSent;
        myPayload.videoTimestamp = report.timestamp;
    }
    if (report.kind === 'audio') {
        myPayload.audioBitrate = getBitrate(report.timestamp, report.bytesSent, payload.audioTimestamp, payload.audioBytesSent);
        myPayload.audioBytesSent = report.bytesSent;
        myPayload.audioPacketsSent = report.packetsSent;
        myPayload.audioTimestamp = report.timestamp;
    }

    myPayload.bitrate = myPayload.audioBitrate + myPayload.videoBitrate;
    return myPayload;

    function getBitrate(now, bytes, prevTimestamp, prevBytesSent) {
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

function InboundRTP(report, payload) {
    let myPayload = payload;

    if (report.mediaType === 'video') {
        myPayload.videoBytesReceived = report.bytesReceived;
        myPayload.videoPacketsReceived = report.packetsReceived;
        myPayload.videoPacketsLost = report.packetsLost;
        myPayload.videoJitter = (report.jitter === undefined)? 0: report.jitter;
    }
    if (report.mediaType === 'audio') {
        myPayload.audioBytesReceived = report.bytesReceived;
        myPayload.audioPacketsReceived = report.packetsReceived;
        myPayload.audioPacketsLost = report.packetsLost;
        myPayload.audioJitter = (report.jitter === undefined)? 0: report.jitter;
    }

    return myPayload;
}

function LocalCandidate(report, payload) {
    let myPayload = payload;

    if (myPayload.localCandidateId === report.id) {
        if (report.address) myPayload.localIp = report.address;
        if (report.ip) myPayload.localIp = report.ip;
        myPayload.localPort = report.port;
        myPayload.localProtocol = report.protocol;
        myPayload.localCandidateType = report.candidateType;
    }

    return myPayload;
}

function RemoteCandidate(report, payload) {
    let myPayload = payload;

    if (myPayload.remoteCandidateId === report.id) {
        if (report.address) myPayload.remoteIp = report.address;
        if (report.ip) myPayload.remoteIp = report.ip;
        myPayload.remotePort = report.port;
        myPayload.remoteProtocol = report.protocol;
        myPayload.remoteCandidateType = report.candidateType;
    }

    return myPayload;
}

function CandidatePair(report, payload) {
    let myPayload = payload;
    let successfulCandidate = typeof report.selected !== 'undefined'
        ? report.state === 'succeeded' && report.nominated && report.selected
        : report.state === 'succeeded' && report.nominated;

    if (successfulCandidate) {
        myPayload.timestamp = Math.trunc(report.timestamp);
        myPayload.localCandidateId = report.localCandidateId;
        myPayload.remoteCandidateId = report.remoteCandidateId;
        myPayload.bytesSentInterval = report.bytesSent - myPayload.bytesSent;
        myPayload.bytesReceivedInterval = report.bytesReceived - myPayload.bytesReceived;
        myPayload.bytesSent = report.bytesSent;
        myPayload.bytesReceived = report.bytesReceived;
        myPayload.avgThroughputInterval = (myPayload.bytesSentInterval + myPayload.bytesReceivedInterval) / (myPayload.interval / 1000);
    }

    return myPayload;
}
