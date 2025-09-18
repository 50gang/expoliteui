import { create } from "domain";
import axiosClient from ".";
import {
  ICreatePostInputs,
  IPost,
  IUploadPostInputs,
} from "../types/post.types";
import { AddReaction, Update } from "@mui/icons-material";
import { IReactionInputs, IUserReactionResponse } from "../types/reaction.types";
import { IBackendResponse, IBackendResponseWithPagination } from "../../../global";

const postApi = {
  KEY: "posts",
  KEY_POST_REACTIONS: "post-reactions",
  getAll(cursor: string | null) {
    return axiosClient.get<unknown, IBackendResponseWithPagination<IPost[]>>(
      "/posts",
      {
        params: { cursor },
      }
    );
  },

  create(data: ICreatePostInputs) {
    return axiosClient.post<unknown, IBackendResponse<IPost>>("/posts", data);
  },

  update(id: string, data: ICreatePostInputs) {
    return axiosClient.patch<unknown, IBackendResponse<IPost>>(
      `/posts/${id}`,
      data
    );
  },

  delete(id: string) {
    return axiosClient.delete<unknown, IBackendResponse<undefined>>(
      `/posts/${id}`,
    );
  },

  uploadMedia(data: IUploadPostInputs) {
    return axiosClient.patch(`/posts/${data.id}/upload`, data.files);
  },

  replacedMedia(data: IUploadPostInputs) {
    return axiosClient.patch(`/posts/${data.id}/replace`, data.files);
  },

  addReaction(data:IReactionInputs) {
    return axiosClient.post('/posts/reaction', data);
  },

  deleteReaction(data:IReactionInputs) {
    return axiosClient.post('/posts/delete-reaction', data);
  },

  getPostReactions(postId: string) {
    return axiosClient.get<unknown, IBackendResponse<IUserReactionResponse[]>>(`/posts/${postId}/reaction`);
  }
};

export default postApi;
