import UseUpload from "@/components/upload/useupload";
import UseUploadPost from "@/libs/tanstack/post/useUploadPost";
import postApi from "@/libs/apis/post.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface IUseCreatePost {
    files: File[],
    handleClose: () => void;
}

export default function UseCreatePost({files, handleClose}: IUseCreatePost) {
    const uploadMutation = UseUpload(files);
    const uploadMediaToPostMutation = UseUploadPost();
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.create,
    onSuccess: async (data) => {
      toast.success("Post Added!");

      const newPost = data.data;

      //make a API
      const uploadData = await uploadMutation.mutateAsync();
      //upload media
      await uploadMediaToPostMutation.mutateAsync({
        id: newPost._id,
        files: uploadData.data,
      });

      // revalidate
      queryClient.invalidateQueries({queryKey: [postApi.KEY]})

      handleClose();
    },
  });
}
