export class EditAppointmentRequest {
    constructor(
        public readonly topic: string,
        public readonly date: string,
    ) {}
}