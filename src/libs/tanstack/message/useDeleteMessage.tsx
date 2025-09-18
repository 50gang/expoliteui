import { messageApi } from "@/libs/apis/message.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUseDeleteMessage {
  conversationId: string;
  handleClose: () => void;
}

export default function useDeleteMessage({
  conversationId,
  handleClose,
}: IUseDeleteMessage) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messageApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [messageApi.KEY, conversationId],
      });

      handleClose();
    },
  });
}
