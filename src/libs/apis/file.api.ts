import { Upload, UploadFile } from "@mui/icons-material";
import axioClient from ".";
import { IBackendResponse, IMediaFiles } from "../../../global";

export const fileApi = {
  UploadFiles(files: File[]) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    return axioClient.post<unknown, IBackendResponse<IMediaFiles[]>>(
      "/cloudinary/upload-multiple",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  UploadSingleFile(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    return axioClient.post<unknown, IBackendResponse<IMediaFiles>>(
      "/cloudinary/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};
