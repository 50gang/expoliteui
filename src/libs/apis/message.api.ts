import axiosClient from ".";
import { IBackendResponse, IBackendResponseWithPagination } from "../../../global";
import { IMessage, IMessageInputs } from "../types/message.types";

export const messageApi = {
  KEY: 'messages',
  getAll(conversationId: string, cursor: string | null) {
    return axiosClient.get<unknown, IBackendResponseWithPagination<IMessage[]>>(
      `/messages/v2/conversation/${conversationId}`,
      { params: { cursor}}
    );
  },

  send(conversationId: string, data: IMessageInputs) {
    return axiosClient.post(`/messages/conversation/${conversationId}`, data)
  },

  delete(id: string) {
    return axiosClient.delete(`/messages/${id}`)
  },

  seen(id: string) {
    return axiosClient.patch(`/messages/${id}/seen`);
  }
};
