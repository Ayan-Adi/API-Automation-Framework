import { APIRequestContext, APIResponse } from '@playwright/test';
import { getAuthToken } from './auth.store';
import { CreateNotePayload, UpdateNotePayload } from '../types/api.types';

export class NotesApi {
  constructor(private readonly request: APIRequestContext) {}

  async createNote(payload: CreateNotePayload): Promise<APIResponse> {
    return this.request.post('notes', {
      headers: {
        'x-auth-token': getAuthToken(),
      },
      form: {
        title: payload.title,
        description: payload.description,
        category: payload.category,
      },
    });
  }

  async getAllNotes(): Promise<APIResponse> {
    return this.request.get('notes', {
      headers: {
        'x-auth-token': getAuthToken(),
      },
    });
  }

  async updateNote(payload: UpdateNotePayload): Promise<APIResponse> {
    return this.request.put(`notes/${payload.id}`, {
      headers: {
        'x-auth-token': getAuthToken(),
      },
      form: {
        title: payload.title,
        description: payload.description,
        category: payload.category,
        completed: payload.completed,
      },
    });
  }

  async deleteNote(noteId: string): Promise<APIResponse> {
    return this.request.delete(`notes/${noteId}`, {
      headers: {
        'x-auth-token': getAuthToken(),
      },
    });
  }
}
