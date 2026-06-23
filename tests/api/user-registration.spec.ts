import { test, expect } from '../../fixtures/api.fixture';
import signupData from '../../testData/signup.json';
import { RegisterUserResponse } from '../../types/api.types';

test.describe('User Registration API', () => {
  test('POST /users/register - should create a new user account successfully', async ({
    usersApi,
  }) => {
    const uniqueEmail = `user_${Date.now()}@example.com`;
    const payload = {
      name: signupData.validUser.name,
      email: uniqueEmail,
      password: signupData.validUser.password,
    };

    const response = await usersApi.registerUser(payload);

    expect(response.status()).toBe(signupData.expectedResponse.status);

    const body = (await response.json()) as RegisterUserResponse;

    expect(body.success).toBe(signupData.expectedResponse.success);
    expect(body.status).toBe(signupData.expectedResponse.status);
    expect(body.message).toBe(signupData.expectedResponse.message);

    expect(body.data).toBeDefined();
    expect(body.data.id).toBeTruthy();
    expect(typeof body.data.id).toBe('string');
    expect(body.data.name).toBe(payload.name);
    expect(body.data.email).toBe(payload.email);
  });
});
