import { Priority } from '../../entity/stats';

export class CandidateUtils {
    // https://tools.ietf.org/html/rfc5245#section-4.1.2.1
    // Parse the uint32 PRIORITY field into its constituent parts from RFC 5245,
    // type preference, local preference, and (256 - component ID).
    // ex: 126 | 32252 | 255 (126 is host preference, 255 is component ID 1)
    public static formatPriority(priority): Priority {
        // tslint:disable-next-line:no-bitwise
        return {type: priority >> 24, local: (priority >> 8) & 0xFFFF, componentId: priority & 0xFF};
    }

    public static stringFormatPriority(priority): string {
        // tslint:disable-next-line:no-bitwise
        return [priority >> 24, (priority >> 8) & 0xFFFF, priority & 0xFF].join(' | ');
    }

    public static hasHigherPriorityThan(a: Priority, b: Priority): boolean {
        if (a.type < b.type) {
            return false;
        }

        if (a.local < b.local) {
            return false;
        }
        return true;
    }
}
