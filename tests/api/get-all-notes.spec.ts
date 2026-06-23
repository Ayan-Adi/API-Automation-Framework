import { test, expect } from '../../fixtures/api.fixture';
import { getAuthToken, getCreatedNote, readAuthSession } from '../../helpers/auth.store';
import getNotesData from '../../testData/get-notes.json';
import { GetAllNotesResponse } from '../../types/api.types';

test.describe('Get All Notes API', () => {
  test('GET /notes - should retrieve all notes for the authenticated user', async ({
    notesApi,
  }) => {
    const session = readAuthSession();
    const token = getAuthToken();
    const createdNote = getCreatedNote();

    expect(token).toBeTruthy();

    const response = await notesApi.getAllNotes();

    expect(response.status()).toBe(getNotesData.expectedResponse.status);

    const body = (await response.json()) as GetAllNotesResponse;

    expect(body.success).toBe(getNotesData.expectedResponse.success);
    expect(body.status).toBe(getNotesData.expectedResponse.status);
    expect(body.message).toBe(getNotesData.expectedResponse.message);

    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    const note = body.data.find((item) => item.id === createdNote.id);

    expect(note).toBeDefined();
    expect(note!.title).toBe(createdNote.title);
    expect(note!.description).toBe(createdNote.description);
    expect(note!.category).toBe(createdNote.category);
    expect(note!.completed).toBe(false);
    expect(note!.user_id).toBe(session!.user.id);
    expect(note!.created_at).toBeTruthy();
    expect(note!.updated_at).toBeTruthy();
  });
});
