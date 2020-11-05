import {filter, map, switchMap, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConferenceService} from '../../../modules/conference/providers/conference.service';
import {ProfileService} from '../../../modules/profile/providers/profile.service';
import {AppointmentService} from '../../../modules/appointment/providers/appointment.service';
import {Appointment} from '../../../modules/appointment/store/appointment.entity';

@Injectable()
export class ConnectionListenerService {

    private profileId = null;
    private profileType = null;

    constructor(
        private conferenceService: ConferenceService,
        private profileService: ProfileService,
        private appointmentService: AppointmentService) {

        this.profileService.getCurrentProfileDataObserver().pipe(filter(p => !!p)).subscribe(p => {
            this.profileId = p.id;
            this.profileType = p.type;
        });
    }

    private getActiveAppointment(): Observable<Appointment> {
        return this.conferenceService
            .getActiveConference().pipe(
                filter(c => !!c),
                take(1),
                switchMap(id => this.appointmentService.getAppointmentByConferenceId(id)),
                filter(c => !!c),
                take(1)
            );
    }

    public getData() {
        return this.getActiveAppointment().pipe(map((appointment: Appointment) => {
            return {
                appointmentId: appointment.id,
                profileId: this.profileId,
                profileType: this.profileType,
                tan: appointment.tan
            };
        }));
    }
}
