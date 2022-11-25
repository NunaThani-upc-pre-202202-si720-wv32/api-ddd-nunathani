export class RegisterPsychologistResponse {
    constructor(
      public id: number,
      public readonly name: string,
      public readonly createdAt: string,
      public readonly createdBy: number,
      public email: string,
      public userPhone: string,
      public username: string,
      public password: string
    ) {}
  }