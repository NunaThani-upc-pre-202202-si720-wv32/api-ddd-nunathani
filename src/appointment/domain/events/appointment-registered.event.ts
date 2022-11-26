export class AppointmentRegistered {
  constructor(
    public readonly id: number,
    public readonly topic: string,
    public readonly date: string,
  ) {
  }
}