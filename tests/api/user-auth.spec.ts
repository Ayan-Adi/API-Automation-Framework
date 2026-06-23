import { test, expect } from '../../fixtures/api.fixture';
import { clearAuthSession, readAuthSession, saveAuthToken, saveUserCredentials } from '../../helpers/auth.store';
import loginData from '../../testData/login.json';
import signupData from '../../testData/signup.json';
import { LoginUserResponse, RegisterUserResponse } from '../../types/api.types';

test.describe.serial('User Authentication Flow', () => {
  test.beforeAll(() => {
    clearAuthSession();
  });

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

    saveUserCredentials({
      id: body.data.id,
      name: body.data.name,
      email: body.data.email,
      password: payload.password,
    });
  });

  test('POST /users/login - should authenticate user and return access token', async ({
    usersApi,
  }) => {
    const session = readAuthSession();

    expect(session?.user).toBeDefined();

    const credentials = session!.user;
    const response = await usersApi.loginUser({
      email: credentials.email,
      password: credentials.password,
    });

    expect(response.status()).toBe(loginData.expectedResponse.status);

    const body = (await response.json()) as LoginUserResponse;

    expect(body.success).toBe(loginData.expectedResponse.success);
    expect(body.status).toBe(loginData.expectedResponse.status);
    expect(body.message).toBe(loginData.expectedResponse.message);

    expect(body.data).toBeDefined();
    expect(body.data.id).toBe(credentials.id);
    expect(body.data.name).toBe(credentials.name);
    expect(body.data.email).toBe(credentials.email);
    expect(body.data.token).toBeTruthy();
    expect(typeof body.data.token).toBe('string');

    saveAuthToken(body.data.token);
  });
});
