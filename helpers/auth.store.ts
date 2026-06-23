import * as fs from 'fs';
import * as path from 'path';

export interface StoredUserCredentials {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface StoredNote {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface AuthSession {
  user: StoredUserCredentials;
  token?: string;
  note?: StoredNote;
}

const AUTH_DIR = path.resolve(__dirname, '../.auth');
const SESSION_FILE = path.join(AUTH_DIR, 'session.json');

function ensureAuthDir(): void {
  if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
  }
}

export function saveUserCredentials(user: StoredUserCredentials): void {
  ensureAuthDir();
  const session = readAuthSession() ?? { user };
  session.user = user;
  fs.writeFileSync(SESSION_FILE, JSON.stringify(session, null, 2));
}

export function saveAuthToken(token: string): void {
  ensureAuthDir();
  const session = readAuthSession();

  if (!session) {
    throw new Error('Cannot save token: user credentials not found. Run registration first.');
  }

  session.token = token;
  fs.writeFileSync(SESSION_FILE, JSON.stringify(session, null, 2));
}

export function readAuthSession(): AuthSession | null {
  if (!fs.existsSync(SESSION_FILE)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(SESSION_FILE, 'utf-8')) as AuthSession;
}

export function getAuthToken(): string {
  const session = readAuthSession();

  if (!session?.token) {
    throw new Error('Auth token not found. Run login test first.');
  }

  return session.token;
}

export function saveCreatedNote(note: StoredNote): void {
  ensureAuthDir();
  const session = readAuthSession();

  if (!session) {
    throw new Error('Cannot save note: session not found. Run authentication first.');
  }

  session.note = note;
  fs.writeFileSync(SESSION_FILE, JSON.stringify(session, null, 2));
}

export function getCreatedNote(): StoredNote {
  const session = readAuthSession();

  if (!session?.note) {
    throw new Error('Created note not found. Run create note test first.');
  }

  return session.note;
}

export function clearAuthSession(): void {
  if (fs.existsSync(SESSION_FILE)) {
    fs.unlinkSync(SESSION_FILE);
  }
}
