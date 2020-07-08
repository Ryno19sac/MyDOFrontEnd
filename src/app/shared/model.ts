// model classes

export class Entity {
  id?: number;
  active?: boolean;
  created?: string;
  updated?: string;
}

export class ErrorView {
  constructor(public errorCode?: number, public message?: string, public field?: string) {}
}

export class MessageView {
  constructor(public messageId?: number, public field?: string) {}
}
export class ResponseBase<T> {
  constructor(
    public number?: string,
    public totalCount?: number,
    public page?: number,
    public limit?: number,
    public message?: string,
    public scope?: string,
    public object?: T,
    public errors?: ErrorView[]
  ) {}
}

export class Permission extends Entity {
  name: string;
}

export class Profile {
  constructor(
    public sub: string,
    public name: string,
    public given_name?: string,
    public family_name?: string,
    public middle_name?: string,
    public nickname?: string,
    public preferred_username?: string,
    public profile?: string,
    public picture?: string,
    public website?: string,
    public email?: string,
    public email_verified?: boolean,
    public gender?: string,
    public birthdate?: string,
    public zoneinfo?: string,
    public locale?: string,
    public phone_number?: string,
    public phone_number_verified?: boolean,
    public address?: object,
    public updated_at?: number
  ) {}
}

export class AuthResponse {
  constructor(public accessToken?: string, public expiresIn?: number, public scope?: string) {}
}
