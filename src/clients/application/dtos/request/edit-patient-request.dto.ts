export class EditPatientRequest {
    constructor(
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly dni: string,
      public readonly email: string,
      public readonly userPhone: string,
      public readonly username: string,
      public readonly password: string,
    ) {}
  }