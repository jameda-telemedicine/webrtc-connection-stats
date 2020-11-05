import {inject, TestBed} from '@angular/core/testing';
import {ConnectionListenerService} from './connection-listener.service';
import {ConferenceService} from '../../../modules/conference/providers/conference.service';
import {Appointment} from '../../../modules/appointment/store/appointment.entity';
import {AppointmentService} from '../../../modules/appointment/providers/appointment.service';
import {ProfileService} from '../../../modules/profile/providers/profile.service';
import {of} from 'rxjs';

const mockGeneralMessageBusService = {
    add: () => null,
    listen: () => {
    }
};

const testProfile = {
    id: 1,
    publicProfileUrl: '/dummy/url',
    type: 1
};

const mockProfileService = {
    getCurrentProfileDataObserver: () => of(testProfile)
};

const mockAppointmentService = {
    getAppointmentByConferenceId: () => of(<Appointment>{id: 1})
};

const mockConferenceService = {
    getActiveConference: () => of(1)
};

describe('ConnectionListenerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConnectionListenerService,
                {provide: ConferenceService, useValue: mockConferenceService},
                {provide: AppointmentService, useValue: mockAppointmentService},
                {provide: ProfileService, useValue: mockProfileService},
            ]
        });
    });

    it('should be created', inject([ConnectionListenerService], (service: ConnectionListenerService) => {
        expect(service).toBeTruthy();
    }));
});
