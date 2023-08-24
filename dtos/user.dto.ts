export class SignInDTO {
  public readonly token!: string;
  public readonly userId!: number;
  public readonly avatar!: string;
  public readonly role!: string;

  constructor(token: string, userId: number, avatar: string, role: string) {
    this.token = token;
    this.userId = userId;
    this.avatar = avatar;
    this.role = role;
  }
}
