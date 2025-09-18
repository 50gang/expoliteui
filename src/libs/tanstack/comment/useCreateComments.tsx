import commentApi from "@/libs/apis/comment.api";
import { useAppSelector } from "@/libs/redux/hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import { toast } from "react-toastify";

interface IUseCreateComments {
    reset: () => void;
}

export default function useCreateComments({reset}: IUseCreateComments) {
    const queryClient = useQueryClient();
    const post = useAppSelector((state) => state.post.data)

    return useMutation({
        mutationFn: commentApi.create,
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries({queryKey: [commentApi.KEY, post._id]})
            toast.success("Comment uploaded!")
        }
    })
}