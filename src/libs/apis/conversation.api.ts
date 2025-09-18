import axiosClient from ".";
import { IBackendResponse } from "../../../global";
import { IConversation } from "../types/conversation.types";

export const conversationApi = {
    KEY: 'conversations',
  createOrGetPrivate(userId: string) {
    return axiosClient.post<unknown, IBackendResponse<IConversation>>(
      "/conversations/private",
      { 
        participantId: userId,
      }
    );
  },

  getAll() {
    return axiosClient.get<unknown, IBackendResponse<IConversation[]>>('/conversations')
  },

  delete(id:string) {
    return axiosClient.delete(`/conversations/${id}`);
  }
};
