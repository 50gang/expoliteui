import { friendApi } from "@/libs/apis/friend.api";
import { useSocketContext } from "@/libs/context/socket.context";
import { IFriendRequest } from "@/libs/types/friend.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { IBackendResponse } from "../../../../global";
import { produce } from "immer";

export default function useGetFriendPendingRequest() {
  const socket = useSocketContext();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [friendApi.KEY],
    queryFn: friendApi.getPendingFriendRequest,
  });

  useEffect(() => {
    const hanndleSendFriendRequest = (data: IFriendRequest) => {
      queryClient.setQueryData<IBackendResponse<IFriendRequest[]>>(
        [friendApi.KEY],
        (oldData) =>
          produce(oldData, (draft) => {
            if (!draft) return;

            draft.data.push(data);
          })
      );
    };

    const hanndleCancelFriendRequest = ({
      friendRequestId,
    }: {
      friendRequestId: string;
    }) => {
      queryClient.setQueryData<IBackendResponse<IFriendRequest[]>>(
        [friendApi.KEY],
        (oldData) =>
          produce(oldData, (draft) => {
            if (!draft) return;

            draft.data = draft.data.filter(
              (request) => request._id !== friendRequestId
            );
          })
      );
    };

    socket?.on("send_friend_request", hanndleSendFriendRequest);
    socket?.on("cancel_friend_request", hanndleCancelFriendRequest);

    return () => {
      socket?.off("send_friend_request", hanndleSendFriendRequest);
      socket?.off("cancel_friend_request", hanndleCancelFriendRequest);
    };
  }, [socket, queryClient]);

  return { data: data?.data || ([] as IFriendRequest[]), isLoading };
}
