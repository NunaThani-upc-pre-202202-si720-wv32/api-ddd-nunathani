import { now } from "moment-timezone";
import { AuditTrail } from "../../../../shared/domain/values/audit-trail.value";
import { DateTime } from "../../../../shared/domain/values/date-time.value";
import { Dni } from "../../../../shared/domain/values/dni.value";
import { Email } from "../../../../shared/domain/values/email.value";
import { Password } from "../../../../shared/domain/values/password.value";
import { PatientName } from "../../../../shared/domain/values/patient-name.value";
import { UserPhone } from "../../../../shared/domain/values/user-phone.value";
import { Username } from "../../../../shared/domain/values/username.value";
import { UserId } from "../../../../users/domain/aggregates/user/user-id.value";
import { PatientFactory } from "../../factories/patient.factory";
import { ClientId } from "./client-id.value";
import { Patient } from "./patient.entity";

describe('patient', () => {

    let patient: Patient;
    let patientId: ClientId;
    let name: PatientName;
    let patientDni: Dni;
    let userPhone: UserPhone;
    let username: Username;
    let password: Password;
    let email: Email;
    let auditTrail: AuditTrail;

    beforeEach(() => {
        patientId = ClientId.of(1);
        name = PatientName.create('John', 'Doe');
        patientDni = Dni.create('12345678');
        userPhone = UserPhone.create('123456789');
        username = Username.create('johndoe');
        password = Password.create('12345678').getOrNull();
        email = Email.create('test@g.com').getOrNull();
        auditTrail = AuditTrail.from(new DateTime(null), new UserId, new DateTime(null), new UserId);
    });

    describe('register', () => {
        it('should register a patient', () => {
            patient = PatientFactory.withId(
                patientId,
                name,
                patientDni,
                auditTrail,
                email,
                userPhone,
                username,
                password);

            expect(patient.getId()).toEqual(patientId);
        });
    });


}
)