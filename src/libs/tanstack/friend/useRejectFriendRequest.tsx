import { friendApi } from "@/libs/apis/friend.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useRejectFriendRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: friendApi.rejectFriendRequest,
        onSuccess() {
            toast.success('Request Rejected');
            queryClient.invalidateQueries({queryKey: [friendApi.KEY]})
        }
    })
}