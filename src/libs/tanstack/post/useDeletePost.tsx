import postApi from "@/libs/apis/post.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface IUseDeletePost {
    handleClose: () => void;
}

export default function useDeletePost ({handleClose}: IUseDeletePost) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postApi.delete,
        onSuccess() {
            toast.success("Post Deleted!");
            //revalidate
            queryClient.invalidateQueries({ queryKey: [postApi.KEY] });

            handleClose();
        }
    })
}