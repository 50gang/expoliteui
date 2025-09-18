import { friendApi } from "@/libs/apis/friend.api";
import userApi from "@/libs/apis/users.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useSendFriendRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: friendApi.sendFriendRequest,
        onSuccess: () => {
            toast.success('Request Sent!');
            queryClient.invalidateQueries({queryKey: [userApi.KEY]})
        }
    })
}