export interface IComment {
    _id: string;
    post: string;
    parent: string | null;
    userCommentId: string;
    userCommentName: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    replies?: (IComment & { replyToUserId?: string; replyToUserName?: string; })[];
}

export type ICreateCommentInputs = {
    postId: string;
    content: string;
    parentCommentId?: string;
    replyToUserId?: string;
}