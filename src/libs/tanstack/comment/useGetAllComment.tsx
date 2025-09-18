import commentApi from "@/libs/apis/comment.api";
import { useSocketContext } from "@/libs/context/socket.context";
import { IComment } from "@/libs/types/comments.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { IBackendResponse } from "../../../../global";
import { Update } from "@mui/icons-material";
import { produce } from "immer";

interface IUseGetAllComment {
  postId: string;
}

export default function useGetAllComment({ postId }: IUseGetAllComment) {
  const socket = useSocketContext();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [commentApi.KEY, postId],
    queryFn: () => commentApi.getAll(postId),
  });

  useEffect(() => {
    const handleCreateComment = (data: IComment) => {
      queryClient.setQueryData<IBackendResponse<IComment[]>>(
        [commentApi.KEY, postId],
        (oldData) => {
          if (!oldData) return;

          return produce(oldData, (draft) => {
            if (data.parent) {
              const parentComment = draft.data.find(
                (comment) => comment._id === data.parent
              );

              if (parentComment) {
                parentComment.replies?.push(data)
              } 
            } else {
                draft.data.push(data);
              }
          });
        }
      );
    };

    const handleUpdateComment = (data: {
      commentId: string;
      content: string;
      updatedAt: string;
    }) => {
      //   queryClient.setQueryData<IBackendResponse<IComment[]>>(
      //     [commentApi.KEY, postId],
      //     (oldData) => {
      //       if (!oldData) return;

      //       const updatedComments = oldData.data.map((comment) => {
      //         if (comment._id === data.commentId) {
      //           return {
      //             ...comment,
      //             content: data.content,
      //             UpdatedAt: data.updatedAt,
      //           };
      //         }

      //         const updatedReplies = comment.replies?.map((reply) =>
      //           reply._id === data.commentId
      //             ? { ...reply, content: data.content, updatedAt: data.updatedAt }
      //             : reply
      //         );

      //         return {
      //             ...comment,
      //             replies: [...(updatedReplies ?? [])]
      //         }
      //       });

      //       return {
      //         ...oldData,
      //         data: updatedComments,
      //       };
      //     }
      //   );

      queryClient.setQueryData<IBackendResponse<IComment[]>>(
        [commentApi.KEY, postId],
        produce((draft) => {
          for (const comment of draft?.data || []) {
            if (comment._id === data.commentId) {
              comment.content = data.content;
              comment.updatedAt = data.updatedAt;
            }

            for (const reply of comment.replies || []) {
              if (reply._id === data.commentId) {
                reply.content = data.content;
                reply.updatedAt = data.updatedAt;
              }
            }
          }
        })
      );
    };

    socket?.on("comment_created", handleCreateComment);
    socket?.on("comment_created", handleUpdateComment);

    return () => {
      socket?.off("comment_created", handleCreateComment);
      socket?.off("comment_created", handleUpdateComment);
    };
  }, [socket, queryClient, postId]);

  return { data: data?.data ?? [], isLoading };
}
