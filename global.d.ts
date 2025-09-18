import { IReactionInputs } from "@/libs/types/reaction.types";

interface Iuser {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatarUrl: string | null;
    coverPhotoUrl: string | null;
    bio?: string;
    isFriend?: boolean;
    isSentFriendRequest?: boolean;
    isActive: boolean;
};

interface IUserAuth {
    message: string;
    data: Iuser;
    accessToken: string;
};

interface IBackendResponse<T> {
    message: string;
    data: T,
};

 type IBackendResponseWithPagination<T> = IBackendResponse & {
    hasNextPage: boolean;
    cursor: string;
 };

interface IMediaFiles {
    url: string;
    public_id: string;
    version: string;
    display_name: string;
    format: string;
    resource_type: string;
}
