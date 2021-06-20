/* eslint-disable no-underscore-dangle */
export class User{
  constructor(
    public id: string,
    public email: string,
  ){

  }
}

export interface Roles {
  editor?: boolean;
  admin?: boolean;
}

export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  roles: Roles;
}
