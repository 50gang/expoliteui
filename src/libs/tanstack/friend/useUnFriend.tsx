import { friendApi } from "@/libs/apis/friend.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useUnFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendApi.unFriend,
    onSuccess() {
        toast.success('Friend Removed!')
      queryClient.invalidateQueries({ queryKey: [friendApi.FRIEND_KEY] });
    },
  });
}
