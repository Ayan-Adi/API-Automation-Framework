import { test as base } from '@playwright/test';
import { UsersApi } from '../helpers/users.api';

type ApiFixtures = {
  usersApi: UsersApi;
};

export const test = base.extend<ApiFixtures>({
  usersApi: async ({ request }, use) => {
    await use(new UsersApi(request));
  },
});

export { expect } from '@playwright/test';
