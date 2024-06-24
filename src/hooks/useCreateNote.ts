import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, } from '../api/api';
import { Note } from '../types/note';
import toast from 'react-hot-toast';

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, { title: string; content: string }>({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      toast.success('New note created successfully!');
      queryClient.setQueryData(['notes', 5], (oldData: any) => {
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
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {
      toast.error('Failed to create a new note!');
    },
  });
};