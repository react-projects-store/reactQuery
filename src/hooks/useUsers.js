import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchUsers,
  fetchUserById,
  fetchUsersInfinite,
  deleteUser,
} from "../services/api";

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

export const useUserDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (result, deletedUserId) => {
      // Update paginated lists
      queryClient.setQueriesData({ queryKey: userKeys.list({}) }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          users: oldData.users.filter((user) => user.id !== deletedUserId),
          total: oldData.total - 1,
        };
      });

      // Update infinite lists
      queryClient.setQueriesData(
        { queryKey: userKeys.infinite({}) },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              users: page.users.filter((user) => user.id !== deletedUserId),
              total: page.total - 1,
            })),
          };
        }
      );

      // Optionally remove the detail cache
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedUserId) });
    },
  });
};
