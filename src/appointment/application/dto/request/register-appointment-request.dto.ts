export class RegisterAppointmentRequest {
    constructor(
        public readonly topic: string,
        public readonly date: string,
    ) {}
}