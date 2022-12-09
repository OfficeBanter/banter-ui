import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function MessageModal({
  open,
  message,
  setOpen,
  title = "Create Your Prompt",
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [messageEdit, setMessageEdit] = React.useState(message);

  const handleChange = (event) => {
    if (event.target.id === "message-body") {
      setMessageEdit(event.target.value);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <TextField
            value={messageEdit}
            onChange={handleChange}
            id="message-body"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
          />
        </div>
      </Modal>
    </div>
  );
}
