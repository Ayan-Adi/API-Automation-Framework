import { APIRequestContext, APIResponse } from '@playwright/test';
import { SignupPayload } from '../types/api.types';

export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  async registerUser(payload: SignupPayload): Promise<APIResponse> {
    return this.request.post('users/register', {
      form: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
    });
  }
}
