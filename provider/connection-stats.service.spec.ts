import { TestBed } from '@angular/core/testing';
import { Server } from 'mock-socket';
import { environment } from '../../../../environments/environment';
import { ConnectionStatsService } from './connection-stats.service';
import { SignalConnection } from '../../../modules/signal/providers/signal.connection';

describe('ConnectionStatsService', () => {
    let mockServer: Server;
    let service: ConnectionStatsService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SignalConnection,
                    useFactory: () => {
                        const connection = new SignalConnection();
                        connection.connect();
                        return connection;
                    }
                },
                ConnectionStatsService
            ]
        });
    });

    beforeEach(() => {
        mockServer = new Server(environment.webSocketUrl, {
            verifyClient: true
        });
        service = TestBed.get(ConnectionStatsService);
    });

    afterEach(() => {
        mockServer.stop();
    });
});
