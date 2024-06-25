import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../api/api';
import { Note, PaginatedNotes } from '../types/note';
import toast from 'react-hot-toast';

type CreateNoteData = { title: string; content: string };

export const useCreateNote = (onAddNote?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, CreateNoteData>({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      toast.success('New note created successfully!');
      queryClient.setQueryData(['notes'], (oldData: PaginatedNotes | undefined) => {
        if (!oldData) {
          return { pages: [[newNote]], pageParams: [undefined] };
        }
        const newData = {
          ...oldData,
          pages: oldData.pages.map((page: Note[]) => [...page, newNote]),
        };
        return newData;
      });
      queryClient.setQueryData(['note', newNote.id], newNote);
      // Optionally invalidate queries if using a real API
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
      
      onAddNote?.();
    },
    onError: () => {
      toast.error('Failed to create a new note!');
    },
  });
};