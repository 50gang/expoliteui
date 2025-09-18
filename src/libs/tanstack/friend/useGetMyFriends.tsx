import { friendApi } from "@/libs/apis/friend.api";
import { useSocketContext } from "@/libs/context/socket.context";
import { IFriendRequest } from "@/libs/types/friend.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { IBackendResponse } from "../../../../global";
import { produce } from "immer";

export default function useGetMyFriends() {
  const socket = useSocketContext();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [friendApi.FRIEND_KEY],
    queryFn: friendApi.getMyFriends,
  });

  useEffect(() => {
    const handleAcceptFriendRequest = (data: IFriendRequest) => {
      queryClient.setQueryData<IBackendResponse<IFriendRequest[]>>(
        [friendApi.KEY],
        (oldData) =>
          produce(oldData, (draft) => {
            if (!draft) return;

            draft.data.push(data);
          })
      );
    };

    const handleUnFriend = (unfriendById: string) => {
      queryClient.setQueryData<IBackendResponse<IFriendRequest[]>>(
        [friendApi.FRIEND_KEY],
        (oldData) =>
          produce(oldData, (draft) => {
            if (!draft) return;

            draft.data = draft.data.filter(
              (friend) => friend._id !== unfriendById
            );
          })
      );
    };

    socket?.on("acccept_friend_request", handleAcceptFriendRequest);
    socket?.on("un_friend", handleUnFriend);

    return () => {
      socket?.off("acccept_friend_request", handleAcceptFriendRequest);
      socket?.on("un_friend", handleUnFriend);
    };
  }, [socket, queryClient]);

  return { data: data?.data || ([] as IFriendRequest[]), isLoading };
}
