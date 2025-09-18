import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import axiosClient from ".";
import {
  IBackendResponse,
  IBackendResponseWithPagination,
  IMediaFiles,
  Iuser,
  IUserAuth,
} from "../../../global";
import { IUserUpdateInputs } from "../types/user.types";

const userApi = {
  KEY: "users",
  getAll(cursor: string | null) {
    return axiosClient.get<unknown, IBackendResponseWithPagination<Iuser[]>>(
      "/users",
      { params: { cursor } }
    );
  },

  uploadAvatar(data: IMediaFiles) {
    return axiosClient.post<unknown, IBackendResponse<Iuser>>(
      "/users/upload-avatar",
      data
    );
  },

  uploadCoverPhoto(data: IMediaFiles) {
    return axiosClient.post<unknown, IBackendResponse<Iuser>>(
      "/users/upload-cover",
      data
    );
  },

  update(id: string, data: IUserUpdateInputs) {
    return axiosClient.patch<unknown, IBackendResponse<Iuser>>(
      `/users/${id}`,
      data
    );
  },
};

export default userApi;
