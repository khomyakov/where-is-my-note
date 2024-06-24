import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../api/api";
import { Note } from "../types/note";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation<string, Error, string>({
    mutationFn: deleteNote,
    onSuccess: (id) => {
      queryClient.setQueryData(['notes'], (oldData: any) => {
        const newData = {
          ...oldData,
          pages: oldData.pages.map((page: Note[]) => page.filter((note: Note) => note.id !== id)),
        };
        return newData;
      });
      queryClient.removeQueries(['note', id]);
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
      // queryClient.invalidateQueries({ queryKey: ['note', id] });
    },
  });
};