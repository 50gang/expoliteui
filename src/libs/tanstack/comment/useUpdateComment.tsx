import commentApi from "@/libs/apis/comment.api";
import { useAppSelector } from "@/libs/redux/hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface IUseUpdateComment {
    onCancel?: () => void;
}

export default function useUpdateComment({onCancel}: IUseUpdateComment) {
  const post = useAppSelector((state) => state.post.data);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      commentApi.update(id, content),
    onSuccess ()  {
        onCancel?.();
        queryClient.invalidateQueries({queryKey: [commentApi.KEY, post._id]});
        toast.success("Comment updated!");
    },
  });
}
