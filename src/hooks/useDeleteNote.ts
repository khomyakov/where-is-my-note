import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../api/api";

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    return useMutation<string, Error, string>({
      mutationFn: deleteNote,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
    });
  };