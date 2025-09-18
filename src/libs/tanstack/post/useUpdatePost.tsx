import UseUpload from "@/components/upload/useupload";
import UseUploadPost from "@/libs/tanstack/post/useUploadPost";
import postApi from "@/libs/apis/post.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import UseReplaceMedia from "./useReplaceMedia";
import { ICreatePostInputs } from "@/libs/types/post.types";
import { IMediaFiles } from "../../../../global";

interface IUseUpdatePost {
  id: string;
  files: File[];
  mediaFiles: IMediaFiles[];
  handleClose: () => void;
}

export default function UseUpdatePost({ id, files, mediaFiles, handleClose }: IUseUpdatePost) {
  const uploadMutation = UseUpload(files);
  const replacedMediaFilesMutation = UseReplaceMedia();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ( data : ICreatePostInputs ) =>
      postApi.update(id, data),
    onSuccess: async () => {
      toast.success("Post Updated!");


      //make a API
      const uploadData = await uploadMutation.mutateAsync();
      //upload media
      await replacedMediaFilesMutation.mutateAsync({
        id,
        files: [...uploadData.data, ...mediaFiles],
      });

      // revalidate
      queryClient.invalidateQueries({ queryKey: [postApi.KEY] });

      handleClose();
    },
  });
}
