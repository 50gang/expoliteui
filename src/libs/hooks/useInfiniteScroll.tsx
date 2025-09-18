import { RefObject, useEffect } from "react";

interface IUseInfiniteScroll {
  targetRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function UseInfinteScroll({
  targetRef,
  hasNextPage,
  fetchNextPage,
}: IUseInfiniteScroll) {
  return useEffect(() => {
    const ref = targetRef.current;
    if (!ref) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, [targetRef, fetchNextPage, hasNextPage]);
}
