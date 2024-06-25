import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNote } from '../api/api';
import { Note, PaginatedNotes } from '../types/note';
import toast from 'react-hot-toast';

export const useUpdateNote = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, { title: string; content: string }>({
    mutationFn: (note) => updateNote(id, note),
    onSuccess: (updatedNote) => {
      toast.success('Note is updated!');
      queryClient.setQueryData(['notes'], (oldData: PaginatedNotes) => {
        const newData = {
          ...oldData,
          pages: oldData.pages.map((page: Note[]) =>
            page.map((note: Note) =>
              note.id === updatedNote.id ? updatedNote : note,
            ),
          ),
        };
        return newData;
      });
      queryClient.setQueryData(['note', id], updatedNote);
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
      // queryClient.invalidateQueries({ queryKey: ['note', id] });
    },
    onError: () => {
      toast.error('Failed to update note!');
    },
  });
};
