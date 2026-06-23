export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedUserData extends UserData {
  token: string;
}

export interface RegisterUserResponse {
  success: boolean;
  status: number;
  message: string;
  data: UserData;
}

export interface LoginUserResponse {
  success: boolean;
  status: number;
  message: string;
  data: AuthenticatedUserData;
}

export interface CreateNotePayload {
  title: string;
  description: string;
  category: string;
}

export interface UpdateNotePayload {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
}

export interface NoteData {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNoteResponse {
  success: boolean;
  status: number;
  message: string;
  data: NoteData;
}

export interface GetAllNotesResponse {
  success: boolean;
  status: number;
  message: string;
  data: NoteData[];
}

export interface UpdateNoteResponse {
  success: boolean;
  status: number;
  message: string;
  data: NoteData;
}

export interface DeleteNoteResponse {
  success: boolean;
  status: number;
  message: string;
}
