export interface Stats {
    appointmentId: number;
    audioBitrate: number;
    audioBytesReceived: number;
    audioBytesSent: number;
    audioJitter: number;
    audioPacketsLost: number;
    audioPacketsReceived: number;
    audioPacketsSent: number;
    audioTimestamp: number;
    avgThroughputInterval: number;
    bitrate: number;
    bytesReceived: number;
    bytesReceivedInterval: number;
    bytesSent: number;
    bytesSentInterval: number;
    connection: boolean;
    connectionState: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
    interval: number;
    likelyBrowser: StatsBrowser;
    // remove this later ------------>
    localCandidateId: string;
    localCandidateType: string;
    localIp: string;
    localPort: string;
    localProtocol: string;
    // end <--------------------------
    profileId: number;
    profileType: number;
    // remove this later ------------>
    remoteCandidateId: string;
    remoteCandidateType: string;
    remoteIp: string;
    remotePort: number;
    remoteProtocol: string;
    // end <--------------------------
    timestamp: number;
    userAgent: string;
    videoBitrate: number;
    videoBytesReceived: number;
    videoBytesSent: number;
    videoJitter: number;
    videoPacketsLost: number;
    videoPacketsReceived: number;
    videoPacketsSent: number;
    videoTimestamp: number;
    version: string;
    tan: string;
    localIceCandidates: IceCandidate[];
    remoteIceCandidates: IceCandidate[];
    iceCandidatePairs: IceCandidatePair[];
}

export interface IceCandidate {
    id: string;
    candidateType: string;
    address: string;
    port: number;
    priority: string;
    protocol: string;
    type: string;
}

export interface IceCandidatePair {
    id: string;
    localCandidateId: string;
    remoteCandidateId: string;
    state: string;
    nominated: boolean;
    selected: boolean;
    priority: string;
}

export interface Priority {
    type: number;
    local: number;
    componentId: number;
}

export type StatsBrowser = 'Firefox' | 'Chrome' | 'Safari' | 'unknown';
