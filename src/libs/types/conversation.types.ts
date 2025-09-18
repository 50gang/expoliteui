export interface IParticipant {
    _id: string;
    email: string;
    name: string;
    avatarUrl: string;
}

export interface IConversation {
    _id: string;
    isGroup: boolean;
    participants: IParticipant[];
    groupAvatarUrl: string | null;
    lastMessageAt: string;
    createdAt: string;
    updatedAt: string;
    lastMessage: string;
    senderLastMessage: string;
    senderLastMessageId: string;
    isLastMessageSeen: boolean;
}