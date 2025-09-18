import { getUser } from "@/libs/utils/getUser.util";
import { UserState } from "../redux/users/userSlice";

export const initialUserState = (): UserState => {
  const user = getUser();
  if (typeof window === "undefined") {
    return {
      data: {
        _id: "",
        name: "",
        email: "",
        role: "user",
        isActive: false,
        avatarUrl: null,
        coverPhotoUrl: null,
        bio: undefined,
      },
      accessToken: "",
      isAuthenticated: false,
    };
  }

  return {
    data: {
      _id: user._id || "",
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      isActive: user.isActive || false,
      avatarUrl: user.avataUrl || null,
      coverPhotoUrl: user.coverPhotoUrl || null,
      bio: user.bio
    },
    accessToken: localStorage.getItem("accessToken") || "",
    isAuthenticated: !!localStorage.getItem("isAuthenticated") || false,
  };
};
