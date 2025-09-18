import postApi from "@/libs/apis/post.api";
import { IPost } from "@/libs/types/post.types";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { IBackendResponseWithPagination } from "../../../../global";

interface IUseAddReaction {
  handleReactionLeave: () => void;
}

export default function useAddReaction({ handleReactionLeave }: IUseAddReaction) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.addReaction,
    onMutate: ({ postId, type }) => {
      queryClient.setQueryData<
        InfiniteData<IBackendResponseWithPagination<IPost[]>, unknown>
      >([postApi.KEY], (oldData) => {
        if (!oldData) return oldData;

        const updatedPages = oldData.pages.map((page) => {
          const updatedPosts = page.data.map((post: IPost) => {
            if (post._id !== postId) return post;

            return { ...post, myReaction: type };
          });

          return { ...page, data: updatedPosts };
        });

        return { ...oldData, pages: updatedPages };
      });
    },
    onSuccess: () => {
      handleReactionLeave();
      queryClient.invalidateQueries({ queryKey: [postApi.KEY] });
    },
  });
}
