import { useUsersInfinite, useUserDelete } from "./hooks/useUsers";
import "./App.css";
import { User } from "./User";

function UsersInfinite() {
  const pageSize = 20;

  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useUsersInfinite(pageSize);

  const { mutate: deleteUser, isPending: isDeleting } = useUserDelete();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {data?.map((user) => (
          <User
            key={user.id}
            {...user}
            onDelete={deleteUser}
            deleting={isDeleting}
          />
        ))}
      </ul>
      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}

export default UsersInfinite;
