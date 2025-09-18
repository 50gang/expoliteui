import { fileApi } from "@/libs/apis/file.api";
import { useMutation } from "@tanstack/react-query";

export default function useUpload(imageFiles: File[]) {
    return useMutation({
        mutationFn: () => fileApi.UploadFiles(imageFiles)
    })
}