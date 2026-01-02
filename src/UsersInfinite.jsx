import { useUsersInfinite } from "./hooks/useUsers";
import "./App.css";
import { User } from "./User";

function UsersInfinite() {
  const pageSize = 20;

  const {
    data: { pages } = {},
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useUsersInfinite(pageSize);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {pages?.map((page, idx) => (
          <ul key={`page-${idx}`}>
            {page.users?.map((user) => (
              <User key={user.id} {...user} />
            ))}
          </ul>
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
