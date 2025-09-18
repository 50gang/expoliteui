import userApi from "@/libs/apis/users.api";
import { IUserUpdateInputs } from "@/libs/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { string } from "yup";

export default function useUpdateUser() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUserUpdateInputs }) =>
      userApi.update(id, data),
    onSuccess() {
        toast.success('Profile Updated!')
    }
  });
}
