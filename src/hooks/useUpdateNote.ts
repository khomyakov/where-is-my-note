import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../api/api";
import { Note } from "../types/note";

export const useUpdateNote = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (note: Note) => updateNote(id, note),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
    });
  };
  