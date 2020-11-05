export interface WebrtcConnection {
    id: 'remote' | 'local';
    bandwidth: number;
}

export interface WebrtcConnectionStats {
    bandwidth: number;
}
