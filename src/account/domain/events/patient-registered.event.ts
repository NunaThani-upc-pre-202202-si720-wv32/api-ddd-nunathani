export class PatientRegistered {
    constructor(
      public readonly id: number,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly dni: string,
      public readonly email: string,
      public readonly username: string,
      public readonly password: string,
      public readonly userPhone: string

    ) {
    }
  }