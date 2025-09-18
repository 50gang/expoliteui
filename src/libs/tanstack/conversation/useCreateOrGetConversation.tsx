import { conversationApi } from "@/libs/apis/conversation.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useCreateOrGetConversation() {

    return useMutation({
        mutationFn: conversationApi.createOrGetPrivate,
    })
}