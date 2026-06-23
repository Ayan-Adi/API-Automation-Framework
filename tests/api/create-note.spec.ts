import { test, expect } from '../../fixtures/api.fixture';
import { getAuthToken, readAuthSession, saveCreatedNote } from '../../helpers/auth.store';
import noteData from '../../testData/note.json';
import { CreateNoteResponse } from '../../types/api.types';

test.describe('Create Note API', () => {
  test('POST /notes - should create a new note for the authenticated user', async ({
    notesApi,
  }) => {
    const session = readAuthSession();
    const token = getAuthToken();

    expect(token).toBeTruthy();

    const payload = {
      title: noteData.validNote.title,
      description: noteData.validNote.description,
      category: noteData.validNote.category,
    };

    const response = await notesApi.createNote(payload);

    expect(response.status()).toBe(noteData.expectedResponse.status);

    const body = (await response.json()) as CreateNoteResponse;

    expect(body.success).toBe(noteData.expectedResponse.success);
    expect(body.status).toBe(noteData.expectedResponse.status);
    expect(body.message).toBe(noteData.expectedResponse.message);

    expect(body.data).toBeDefined();
    expect(body.data.id).toBeTruthy();
    expect(typeof body.data.id).toBe('string');
    expect(body.data.title).toBe(payload.title);
    expect(body.data.description).toBe(payload.description);
    expect(body.data.category).toBe(payload.category);
    expect(body.data.completed).toBe(false);
    expect(body.data.user_id).toBe(session!.user.id);
    expect(body.data.created_at).toBeTruthy();
    expect(body.data.updated_at).toBeTruthy();

    saveCreatedNote({
      id: body.data.id,
      title: body.data.title,
      description: body.data.description,
      category: body.data.category,
    });
  });
});
