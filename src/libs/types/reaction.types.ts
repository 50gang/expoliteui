export type IReactionTypes = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

export type IReactionInputs = {
    postId: string;
    type?: IReactionTypes;
}

export interface IReactionUI {
    name: IReactionTypes;
    emoji: string;
}

export interface IUserReactionResponse {
    _id: string;
    post: string;
    userId: string;
    userName: string;
    userAvatarUrl: string;
    type: IReactionTypes;
    createdAt: string;
    updatedAt: string;
}