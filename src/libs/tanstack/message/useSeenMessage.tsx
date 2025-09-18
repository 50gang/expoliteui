import { messageApi } from "@/libs/apis/message.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useSeenMessage (conversatonId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: messageApi.seen,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [messageApi.KEY, conversatonId]
            })
        }
    })
}