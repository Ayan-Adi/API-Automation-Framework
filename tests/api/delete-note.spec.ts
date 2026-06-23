import { test, expect } from '../../fixtures/api.fixture';
import { getAuthToken, getNoteToDelete } from '../../helpers/auth.store';
import deleteNoteData from '../../testData/delete-note.json';
import { DeleteNoteResponse, GetAllNotesResponse } from '../../types/api.types';

test.describe('Delete Note API', () => {
  test('DELETE /notes/{id} - should delete a note successfully', async ({ notesApi }) => {
    const token = getAuthToken();
    const noteToDelete = getNoteToDelete();

    expect(token).toBeTruthy();

    const response = await notesApi.deleteNote(noteToDelete.id);

    expect(response.status()).toBe(deleteNoteData.expectedResponse.status);

    const body = (await response.json()) as DeleteNoteResponse;

    expect(body.success).toBe(deleteNoteData.expectedResponse.success);
    expect(body.status).toBe(deleteNoteData.expectedResponse.status);
    expect(body.message).toBe(deleteNoteData.expectedResponse.message);

    const getAllResponse = await notesApi.getAllNotes();
    const getAllBody = (await getAllResponse.json()) as GetAllNotesResponse;

    const deletedNote = getAllBody.data.find((item) => item.id === noteToDelete.id);
    expect(deletedNote).toBeUndefined();
  });
});
