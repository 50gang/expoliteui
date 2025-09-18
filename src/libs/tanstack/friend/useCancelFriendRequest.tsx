import { friendApi } from "@/libs/apis/friend.api";
import userApi from "@/libs/apis/users.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useCancelFriendRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: friendApi.cancelFriendRequest,
        onSuccess: () => {
            toast.success('Request Sent!');
            queryClient.invalidateQueries({queryKey: [userApi.KEY]})
        }
    })
}