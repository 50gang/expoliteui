import { messageApi } from "@/libs/apis/message.api";
import { IMessageInputs } from "@/libs/types/message.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUpload from "../upload/useUpload";

interface IUseSendMessage {
    conversationId: string;
    mediaFiles: File[];
    reset: () => void;
}

export default function useSendMessage({conversationId, mediaFiles, reset}: IUseSendMessage) {
  const queryClient = useQueryClient();

  const upload = useUpload(mediaFiles);

  return useMutation({
    mutationFn: async (data: IMessageInputs) => {
      const res = await upload.mutateAsync();

      return messageApi.send(conversationId, {...data, mediaFiles: res.data})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [messageApi.KEY, conversationId],
      });
      reset();
    },
  });
}
