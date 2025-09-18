import postApi from "@/libs/apis/post.api";
import { IPost } from "@/libs/types/post.types";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { IBackendResponseWithPagination } from "../../../../global";

interface IUseDeleteReaction {
  handleReactionLeave: () => void;
}

export default function useDeleteReaction({ handleReactionLeave }: IUseDeleteReaction) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postApi.deleteReaction,
        onMutate({ postId }) {
            queryClient.setQueryData<
        InfiniteData<IBackendResponseWithPagination<IPost[]>, unknown>
      >([postApi.KEY], (oldData) => {
        if (!oldData) return;

        const updatedPages = oldData.pages.map((page) => {
          const updatedPosts = page.data.map((post) => {
            if (post._id !== postId) return post;

            return { ...post, myReaction: undefined };
          });

          return { ...page, data: updatedPosts };
        });

        return { ...oldData, pages: updatedPages };
      })
        },
        onSuccess() {
            handleReactionLeave();
            queryClient.invalidateQueries({ queryKey: [postApi.KEY] });
        }
    })
}