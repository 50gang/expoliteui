import { conversationApi } from "@/libs/apis/conversation.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface IUseDeleteConversation {
    handleClose: () => void;
}

export default function useDeleteConversation({handleClose}: IUseDeleteConversation) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: conversationApi.delete,
        onSuccess: () => {
            toast.success('Conversation Ddeleted');
            queryClient.invalidateQueries({queryKey: [conversationApi.KEY]})
            handleClose();
        }
    })
}