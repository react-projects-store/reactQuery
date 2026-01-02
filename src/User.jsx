import { useState } from "react";

import { UserDialog } from "./UserDialog";

export const User = ({ id, firstName, lastName, email }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <li onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
        {id} - {firstName} {lastName} ({email})
      </li>

      <UserDialog open={open} onClose={() => setOpen(false)} userId={id} />
    </>
  );
};
