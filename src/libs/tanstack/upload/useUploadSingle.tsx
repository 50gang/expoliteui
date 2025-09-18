import { fileApi } from "@/libs/apis/file.api";
import { useMutation } from "@tanstack/react-query";

export default function useUploadSingle() {
    return useMutation({
        mutationFn: fileApi.UploadSingleFile,
    })
} 