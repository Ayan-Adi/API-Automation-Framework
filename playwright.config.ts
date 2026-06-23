import { defineConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { getEnvironmentConfig, getEnvironmentName } from './config/environment';

const envName = getEnvironmentName();
const envFilePath = path.resolve(__dirname, `config/environments/${envName}.env`);

if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const environment = getEnvironmentConfig();
const authProject = `auth-${environment.name}`;
const notesProject = `notes-${environment.name}`;
const getNotesProject = `get-notes-${environment.name}`;
const updateNoteProject = `update-note-${environment.name}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL ?? environment.baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: authProject,
      testMatch: /user-auth\.spec\.ts/,
    },
    {
      name: notesProject,
      testMatch: /create-note\.spec\.ts/,
      dependencies: [authProject],
    },
    {
      name: getNotesProject,
      testMatch: /get-all-notes\.spec\.ts/,
      dependencies: [notesProject],
    },
    {
      name: updateNoteProject,
      testMatch: /update-note\.spec\.ts/,
      dependencies: [getNotesProject],
    },
  ],
});
