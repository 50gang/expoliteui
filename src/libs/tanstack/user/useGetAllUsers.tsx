import userApi from "@/libs/apis/users.api";
import { useSocketContext } from "@/libs/context/socket.context";
import { useAppSelector } from "@/libs/redux/hook";
import { IFriendRequest } from "@/libs/types/friend.types";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { IBackendResponseWithPagination, Iuser } from "../../../../global";
import { produce } from "immer";

export default function useGetAllUsers() {
  const user = useAppSelector((state) => state.user.data);
  const socket = useSocketContext();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [userApi.KEY],
      queryFn: ({ pageParam }: { pageParam: string | null }) =>
        userApi.getAll(pageParam),
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.cursor,
    });

  useEffect(() => {
    const handleAcceptFriendRequest = (
      data: IFriendRequest,
      whoEmitEventId: string
    ) => {
      queryClient.setQueryData<
        InfiniteData<IBackendResponseWithPagination<Iuser[]>>
      >([userApi.KEY], (oldData) =>
        produce(oldData, (draft) => {
          if (!draft) return;

          draft.pages.forEach((page) => {
            page.data.forEach((u) => {
              if (u._id === whoEmitEventId) {
                u.isFriend = true;
                u.isSentFriendRequest = false;
              }
            });
          });
        })
      );
    };

    const handleunFriend = (unfriendById: string) => {
      queryClient.setQueryData<
        InfiniteData<IBackendResponseWithPagination<Iuser[]>>
      >([userApi.KEY], (oldData) =>
        produce(oldData, (draft) => {
          if (!draft) return;

          draft.pages.forEach((page) => {
            page.data.forEach((u) => {
              if (u._id === unfriendById) {
                u.isFriend = false;
                u.isSentFriendRequest = false;
              }
            });
          });
        })
      );
    };

    const handleRejectFriendRequest = (_: unknown, whoEmitEventId: string) => {
      queryClient.setQueryData<
        InfiniteData<IBackendResponseWithPagination<Iuser[]>>
      >([userApi.KEY], (oldData) =>
        produce(oldData, (draft) => {
          if (!draft) return;

          draft.pages.forEach((page) => {
            page.data.forEach((u) => {
              if (u._id === whoEmitEventId) {
                u.isFriend = false;
                u.isSentFriendRequest = false;
              }
            });
          });
        })
      );
    };

    socket?.on("accept_friend_request", handleAcceptFriendRequest);
    socket?.on("un_friend", handleunFriend);
    socket?.on("reject_friend_request", handleRejectFriendRequest);

    return () => {
      socket?.off("accept_friend_request", handleAcceptFriendRequest);
      socket?.on("un_friend", handleunFriend);
      socket?.off("reject_friend_request", handleRejectFriendRequest);
    };
  }, [socket, queryClient]);

  const users = data?.pages?.flatMap((page) => page.data) || [];
  return {
    data: users.filter((u) => u._id !== user._id),
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}
