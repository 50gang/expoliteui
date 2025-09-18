import userApi from "@/libs/apis/users.api";
import { useMutation } from "@tanstack/react-query";

export default function useUploadAvatar() {
    return useMutation({
        mutationFn: userApi.uploadAvatar
    })
}