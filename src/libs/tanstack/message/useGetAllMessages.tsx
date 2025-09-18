import { messageApi } from "@/libs/apis/message.api";
import { useSocketContext } from "@/libs/context/socket.context";
import { IMessage } from "@/libs/types/message.types";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { produce } from "immer";
import { useEffect } from "react";
import { IBackendResponseWithPagination } from "../../../../global";

export default function useGetAllMessages(conversationId: string) {
  const socket = useSocketContext();
  const queryClient = useQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [messageApi.KEY, conversationId],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      messageApi.getAll(conversationId, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  const messages = data?.pages?.flatMap((page) => page.data).reverse() || [];

  useEffect(() => {
    const handleNewMessage = (data: IMessage) => {
      queryClient.setQueryData<
        InfiniteData<IBackendResponseWithPagination<IMessage[]>>
      >([messageApi.KEY, conversationId], (oldData) =>
        produce(oldData, (draft) => {
          if (!draft) return;

          const lastPage = draft.pages[draft.pages.length - 1];
          lastPage.data.unshift(data);
        })
      );
    };
  });

  return {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}
