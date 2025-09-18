import { IMediaFiles } from "../../../global";
import { IReactionTypes } from "./reaction.types";

export type ICreatePostInputs = {
    content: string;
    backgroundColor: string;
};

export type IPost = {
    _id: string;
    author_id: string;
    backgroundColor: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    mediaFiles: (IMediaFiles & {url:string})[];
    image: string;
    privacy: string;
    reactionCount: Record<IReactionTypes, number>;
    comments: string;
    avatar: string;
    authorName: string;
    authorEmail: string;
    myReaction?: IReactionTypes;
};

export type IUploadPostInputs = {
    id: string;
    files: IMediaFiles[]
}