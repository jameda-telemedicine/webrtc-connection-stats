import { inject, TestBed } from '@angular/core/testing';

import { MonitoringService } from './monitoring.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MonitoringService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [MonitoringService]
        });
    });

    it('should be created', inject([MonitoringService], (service: MonitoringService) => {
        expect(service).toBeTruthy();
    }));
});
