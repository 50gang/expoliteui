import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import axiosClient from ".";
import { IUserAuth } from "../../../global";

const AuthApi = {
    signUp(data:SignUpInputs) {
        return axiosClient.post<unknown, IUserAuth>('/auth/sign-up', data)
    },

    SignIn(data:SignInInputs) {
        return axiosClient.post<unknown, IUserAuth>('/auth/sign-in', data)
    }
}

export default AuthApi