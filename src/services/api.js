export const fetchUsers = async (page, count) => {
  const res = await fetch(
    `https://dummyjson.com/users?limit=${count}&skip=${(page - 1) * count}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return await res.json();
};

export const fetchUsersInfinite = async (page, count) => {
  const res = await fetch(
    `https://dummyjson.com/users?limit=${count}&skip=${page * count}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return await res.json();
};

export const fetchUserById = async (userId) => {
  const res = await fetch(`https://dummyjson.com/users/${userId}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const deleteUser = async (userId) => {
  const res = await fetch(`https://dummyjson.com/users/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};
