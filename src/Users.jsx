import { useState } from "react";

import { useUsers } from "./hooks/useUsers";
import "./App.css";
import { User } from "./User";
import { Pagination } from "./Pagination";

function Users() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: { users, total } = {},
    isLoading,
    isError,
    error,
    isFetching,
  } = useUsers(page, pageSize);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map((user) => (
          <User key={user.id} {...user} />
        ))}
      </ul>
      {isFetching && <p>Loading...</p>}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default Users;
