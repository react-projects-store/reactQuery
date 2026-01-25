import { useState } from "react";

import { UserDialog } from "./UserDialog";

export const User = ({
  id,
  firstName,
  lastName,
  email,
  onDelete,
  deleting,
}) => {
  const [open, setOpen] = useState(false);
  const handleUserDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <>
      <li
        onClick={() => setOpen(true)}
        style={{
          cursor: "pointer",
          width: "max-content",
          display: "flex",
          gap: 8,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>
          {id} - {firstName} {lastName} ({email})
        </p>
        <button onClick={handleUserDelete} disabled={deleting}>
          Remove
        </button>
      </li>

      <UserDialog open={open} onClose={() => setOpen(false)} userId={id} />
    </>
  );
};
