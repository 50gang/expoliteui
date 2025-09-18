import axiosClient from ".";
import { IBackendResponse } from "../../../global";
import { IComment, ICreateCommentInputs } from "../types/comments.types";

const commentApi = {
    KEY: "comments",
    create(data: ICreateCommentInputs) {
        return axiosClient.post('/comments', data);
    },

    getAll(postId: string) {
        return axiosClient.get<unknown, IBackendResponse<IComment[]>>(`/comments/post/${postId}`);
    },

    update(id: string, content: string) {
        return axiosClient.patch(`/comments/${id}`, { content });
    },

    delete(id:string) {
        return axiosClient.delete(`/comments/${id}`);
    }

};

export default commentApi;