import { friendApi } from "@/libs/apis/friend.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useAcceptFriendRequest () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: friendApi.acceptFriendRequest,
        onSuccess() {
            toast.success('Request Accepted!')
            queryClient.invalidateQueries({queryKey: [friendApi.KEY]})
        }
    })
}