import postApi from "@/libs/apis/post.api";
import { useQuery } from "@tanstack/react-query";

interface IUseGetPostReaction {
    postId: string;
}

export default function useGetPostReaction({ postId }: IUseGetPostReaction) {
    const {data, isLoading} = useQuery({
        queryKey: [postApi.KEY_POST_REACTIONS, postId],
        queryFn: () => postApi.getPostReactions(postId)
    });

    return {data: data?.data ?? [], isLoading};
}