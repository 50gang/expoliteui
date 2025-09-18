import { IMediaFiles } from "../../../global";

export interface ISeen {
    seenById: string;
    seennByName: string;
    seenByAvatarUrl: string;
}

export interface IMessage {
    _id: string;
    conversation:string;
    senderId: string;
    senderName: string;
    senderAvatarUrl: string;
    text: string;
    mediaFiles: string[];
    isDelete: boolean;
    seenBy: ISeen[];
    createdAt: string;
    updatedAt: string;
}

export type IMessageInputs = {
    text: string;
    mediaFiles?: IMediaFiles[];
}