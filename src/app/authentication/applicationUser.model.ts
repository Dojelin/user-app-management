export class ApplicationUser {
  constructor(
    public email: string,
    private _token: string,
    private password?: string
  ) {}

  get token() {
    return this._token;
  }
}
