import userApi from "@/libs/apis/users.api";
import { useMutation } from "@tanstack/react-query";

export default function useUploadCoverPhoto() {
    return useMutation({
        mutationFn: userApi.uploadCoverPhoto
    })
}