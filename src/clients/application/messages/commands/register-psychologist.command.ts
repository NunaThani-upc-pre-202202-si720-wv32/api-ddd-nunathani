export class RegisterPsychologist {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly userPhone: string,
    public readonly username: string,
    public readonly password: string
  ) {}
}