export interface ILoginPayload {
  email: string;
  password: string;
}
export interface ISignPayload {
  full_name: string;
  email: string;
  gender: string;
  password: string;
  date_of_birth: string;
}

export interface IOTPPayload {
  email: string;
  otp: string;
}
