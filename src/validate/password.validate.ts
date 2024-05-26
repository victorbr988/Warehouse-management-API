export class PasswordValidate {
  public validate(password: string): boolean {
    return password.length >= 8;
  }
}