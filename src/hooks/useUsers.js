import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { fetchUsers, fetchUserById, fetchUsersInfinite } from "../services/api";

export const useUsers = (page, count) => {
  return useQuery({
    queryKey: ["users", page, count],
    queryFn: () => fetchUsers(page, count),
  });
};

export const useUsersInfinite = (count) => {
  return useInfiniteQuery({
    queryKey: ["users-infinite", count],
    queryFn: ({ pageParam }) => fetchUsersInfinite(pageParam, count),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const pageNum = lastPage.skip / lastPage.limit + 1;
      return pageNum * lastPage.limit < lastPage.total ? pageNum : undefined;
    },
  });
};

export const useUser = (userId, enabled) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId && enabled,
    staleTime: 5 * 60 * 1000,
  });
};
