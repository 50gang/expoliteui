import PostApi from "@/libs/apis/post.api";
import { IUploadPostInputs } from "@/libs/types/post.types";
import { useMutation } from "@tanstack/react-query";

export default function UseReplaceMedia () {
    return useMutation({
    mutationFn: (data: IUploadPostInputs) =>
      PostApi.replacedMedia(data)
  })
}