export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface IName {
  title: string;
  first: string;
  last: string;
}

export interface IUser {
  name: string;
  gender: Gender;
  city: string;
  state: string;
  dateRegistered: number;
}
