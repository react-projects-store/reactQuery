import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { fetchUsers, fetchUserById, fetchUsersInfinite } from "../services/api";

const userKeys = {
  all: ["users"],
  lists: () => [...userKeys.all, "list"],
  list: (filters) => [...userKeys.lists(), { filters }],
  infinite: (filters) => [...userKeys.lists(), "infinite", { filters }],
  details: () => [...userKeys.all, "detail"],
  detail: (id) => [...userKeys.details(), id],
};

export const useUsers = (page, count) => {
  return useQuery({
    queryKey: userKeys.list({ page, count }),
    queryFn: () => fetchUsers(page, count),
  });
};

export const useUsersInfinite = (count) => {
  return useInfiniteQuery({
    queryKey: userKeys.infinite({ count }),
    queryFn: ({ pageParam }) => fetchUsersInfinite(pageParam, count),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const pageNum = lastPage.skip / lastPage.limit + 1;
      return pageNum * lastPage.limit < lastPage.total ? pageNum : undefined;
    },
    select: (data) =>
      data?.pages
        ?.reduce((acc, page) => [...acc, ...page.users], [])
        .map(({ id, firstName, lastName, email }) => ({
          id,
          firstName,
          lastName,
          email,
        })),
  });
};

export const useUser = (userId, enabled) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUserById(userId),
    enabled: !!userId && enabled,
    staleTime: 5 * 60 * 1000,
  });
};
