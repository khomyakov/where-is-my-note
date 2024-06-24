import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/oleksandr-devico/where-is-my-note',
});

export const fetchNotes = async (page: number, limit: number) => {
    const response = await api.get(`/notes?_page=${page}&_limit=${limit}`);
    return response.data;
  };

export const fetchNoteById = async (id: string) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: { title: string; content: string }) => {
  const response = await api.post('/notes', note);
  return response.data;
};

export const updateNote = async (id: string, note: { title: string; content: string }) => {
  const response = await api.put(`/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
};