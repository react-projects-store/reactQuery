// components/UserDialog.jsx
import { useEffect, useRef } from "react";
import { useUser } from "./hooks/useUsers";

export const UserDialog = ({ open, onClose, userId }) => {
  const dialogRef = useRef(null);
  const { data, isLoading, isError } = useUser(userId, open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <button onClick={onClose} style={{ float: "right" }}>
        ✕
      </button>

      {isLoading && <p>Loading user details…</p>}
      {isError && <p>Failed to load user</p>}

      {data && (
        <>
          <h3>
            {data.firstName} {data.lastName}
          </h3>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
          <p>
            Address: {data.address.address},{data.address.city},{" "}
            {data.address.state}, {data.address.postalCode},{" "}
            {data.address.country}
          </p>
          <p>University: {data.university}</p>
        </>
      )}
    </dialog>
  );
};
