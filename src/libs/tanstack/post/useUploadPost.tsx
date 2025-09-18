import PostApi from "@/libs/apis/post.api";
import { IUploadPostInputs } from "@/libs/types/post.types";
import { useMutation } from "@tanstack/react-query";

export default function useUploadPost () {
    return useMutation({
    mutationFn: (data: IUploadPostInputs) =>
      PostApi.uploadMedia(data)
  })
}