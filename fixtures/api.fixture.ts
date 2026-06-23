import { test as base } from '@playwright/test';
import { NotesApi } from '../helpers/notes.api';
import { UsersApi } from '../helpers/users.api';

type ApiFixtures = {
  usersApi: UsersApi;
  notesApi: NotesApi;
};

export const test = base.extend<ApiFixtures>({
  usersApi: async ({ request }, use) => {
    await use(new UsersApi(request));
  },
  notesApi: async ({ request }, use) => {
    await use(new NotesApi(request));
  },
});

export { expect } from '@playwright/test';
