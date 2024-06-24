import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../api/api";
import { Note } from "../types/note";

export const useUpdateNote = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, { title: string; content: string }>({
    mutationFn: (note) => updateNote(id, note),
    onSuccess: (updatedNote) => {
      queryClient.setQueryData(['notes'], (oldData: any) => {
        const newData = {
          ...oldData,
          pages: oldData.pages.map((page: Note[]) =>
            page.map((note: Note) => (note.id === updatedNote.id ? updatedNote : note))
          ),
        };
        return newData;
      });
      queryClient.setQueryData(['note', id], updatedNote);
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
      // queryClient.invalidateQueries({ queryKey: ['note', id] });
    },
  });
};