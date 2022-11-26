import { now } from "moment-timezone";
import { AuditTrail } from "../../../../shared/domain/values/audit-trail.value";
import { DateTime } from "../../../../shared/domain/values/date-time.value";
import { Dni } from "../../../../shared/domain/values/dni.value";
import { Email } from "../../../../shared/domain/values/email.value";
import { Password } from "../../../../shared/domain/values/password.value";
import { PsychologistName } from "../../../../shared/domain/values/psychologist-name.value";
import { UserPhone } from "../../../../shared/domain/values/user-phone.value";
import { Username } from "../../../../shared/domain/values/username.value";
import { UserId } from "../../../../users/domain/aggregates/user/user-id.value";
import { PsychologistFactory } from "../../factories/psychologist.factory";
import { ClientId } from "./client-id.value";
import { Psychologist } from "./psychologist.entity";

describe('psychologist', () => {

    let psychologist: Psychologist;
    let psychologistId: ClientId;
    let name: PsychologistName;
    let psychologistDni: Dni;
    let userPhone: UserPhone;
    let username: Username;
    let password: Password;
    let email: Email;
    let auditTrail: AuditTrail;

    beforeEach(() => {
        psychologistId = ClientId.of(1);
        name = PsychologistName.create('Rodolfo');
        psychologistDni = Dni.create('85214763');
        userPhone = UserPhone.create('987654321');
        username = Username.create('rodolfo123');
        password = Password.create('yosoyrodolfo').getOrNull();
        email = Email.create('psicologo@gmail.com').getOrNull();
        auditTrail = AuditTrail.from(new DateTime(null), new UserId, new DateTime(null), new UserId);
    });

    describe('register', () => {
        it('should register a psychologist', () => {
            psychologist = PsychologistFactory.withId(
                psychologistId,
                name,
                auditTrail,
                email,
                userPhone,
                username,
                password);

            expect(psychologist.getId()).toEqual(psychologistId);
        });
    });


}
)