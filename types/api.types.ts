export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
}

export interface RegisterUserResponse {
  success: boolean;
  status: number;
  message: string;
  data: UserData;
}
