import { test, expect } from '../../fixtures/api.fixture';
import { getAuthToken, readAuthSession, saveCreatedNotes } from '../../helpers/auth.store';
import noteData from '../../testData/note.json';
import { CreateNoteResponse } from '../../types/api.types';

test.describe('Create Note API', () => {
  test('POST /notes - should create two notes for the authenticated user', async ({
    notesApi,
  }) => {
    const session = readAuthSession();
    const token = getAuthToken();

    expect(token).toBeTruthy();

    const notePayloads = [noteData.noteToUpdate, noteData.noteToDelete];
    const createdNotes: Array<{
      id: string;
      title: string;
      description: string;
      category: string;
    }> = [];

    for (const payload of notePayloads) {
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

      createdNotes.push({
        id: body.data.id,
        title: body.data.title,
        description: body.data.description,
        category: body.data.category,
      });
    }

    expect(createdNotes).toHaveLength(2);

    saveCreatedNotes({
      noteToUpdate: createdNotes[0],
      noteToDelete: createdNotes[1],
    });
  });
});
