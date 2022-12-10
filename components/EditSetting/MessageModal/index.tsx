import * as React from "react";
import { Modal, Button, Label, Textarea, FileInput } from "flowbite-react";

export default function MessageModal({ open, message, setOpen, saveMessage }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [messageEdit, setMessageEdit] = React.useState({ ...message } || {});
  const [imageURL, setImageURL] = React.useState(message?.customFile?.location);

  const MAX_IMAGE = 5000000;
  const handleChange = (event) => {
    if (event.target.id === "message") {
      setMessageEdit({ ...messageEdit, message: event.target.value });
    }
    if (event.target.id === "file") {
      const file = event.target.files[0];

      if (!file) {
        return;
      }
      setMessageEdit({ ...messageEdit, file });
      // this is 5mb
      if (file.size > MAX_IMAGE) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          setImageURL(result);
        }
      };
      reader.readAsDataURL(file);
      setMessageEdit({ ...messageEdit, file });
    }
  };

  const validate = () => {
    if (!messageEdit.message) {
      return false;
    }
    if (messageEdit?.file?.size > MAX_IMAGE) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <Modal className="z-40" show={open} onClose={handleClose}>
        <Modal.Header>
          {message ? "Edit Message" : "Create your message"}
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-6">
            <div id="textarea">
              <div className="mb-2 block">
                <Label htmlFor="message" value="Your message" />
              </div>
              <Textarea
                id="message"
                value={messageEdit.message}
                placeholder="Leave a comment..."
                onChange={handleChange}
                required={true}
                rows={4}
              />
            </div>

            <div id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
              </div>
              <FileInput
                className="pb-8"
                id="file"
                accept="image/*"
                helperText={
                  messageEdit?.file?.size > MAX_IMAGE
                    ? "File is too large"
                    : !messageEdit.file
                    ? "Upload an image for the prompt!"
                    : ""
                }
                onChange={handleChange}
              />
              {imageURL && <img src={imageURL} />}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!validate()}
            onClick={() => saveMessage(messageEdit)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
