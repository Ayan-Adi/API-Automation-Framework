import { test, expect } from '../../fixtures/api.fixture';
import { getAuthToken, getCreatedNote, readAuthSession, saveCreatedNote } from '../../helpers/auth.store';
import updateNoteData from '../../testData/update-note.json';
import { UpdateNoteResponse } from '../../types/api.types';

test.describe('Update Note API', () => {
  test('PUT /notes/{id} - should update an existing note successfully', async ({
    notesApi,
  }) => {
    const session = readAuthSession();
    const token = getAuthToken();
    const createdNote = getCreatedNote();

    expect(token).toBeTruthy();

    const payload = {
      id: createdNote.id,
      title: updateNoteData.updatedNote.title,
      description: updateNoteData.updatedNote.description,
      category: updateNoteData.updatedNote.category,
      completed: updateNoteData.updatedNote.completed,
    };

    const response = await notesApi.updateNote(payload);

    expect(response.status()).toBe(updateNoteData.expectedResponse.status);

    const body = (await response.json()) as UpdateNoteResponse;

    expect(body.success).toBe(updateNoteData.expectedResponse.success);
    expect(body.status).toBe(updateNoteData.expectedResponse.status);
    expect(body.message).toBe(updateNoteData.expectedResponse.message);

    expect(body.data).toBeDefined();
    expect(body.data.id).toBe(createdNote.id);
    expect(body.data.title).toBe(payload.title);
    expect(body.data.description).toBe(payload.description);
    expect(body.data.category).toBe(payload.category);
    expect(body.data.completed).toBe(payload.completed);
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
