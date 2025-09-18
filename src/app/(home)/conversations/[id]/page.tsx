import ConversationsDetail from "@/components/conversations/detail";

export default async function ConversationDetailPage({
    params,
}: {
    params: Promise<{id: string}>;
}) {
    const { id } = await params;
 
    return <ConversationsDetail id={id}/>
}