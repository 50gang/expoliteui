import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IPost } from "@/libs/types/post.types";
import { IReactionTypes } from "@/libs/types/reaction.types";

interface PostState {
  data: IPost;
}

// Define the initial state using that type
export const initialState: PostState = {
  data: {
    _id: "",
    author_id: "",
    backgroundColor: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    mediaFiles: [],
    image: "",
    privacy: "public",
    reactionCount: {} as Record<IReactionTypes, number>,
    comments: "",
    avatar: "",
    authorName: "",
    authorEmail: "",
    myReaction: undefined,
  },
};

export const postSlice = createSlice({
  name: "post",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<IPost>) => {
      state.data = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;

export default postSlice.reducer;
