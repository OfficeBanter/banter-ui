import * as React from "react";
import { Modal, Button, Label, Textarea, FileInput } from "flowbite-react";
import { useToast } from "../../Toast";
import { fileURLToPath } from "url";
import { validateConfig } from "next/dist/server/config-shared";

export default function MessageModal({
  open,
  message,
  setOpen,
  saveMessage,
  title = "Create Your Prompt",
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toast = useToast();

  const [messageEdit, setMessageEdit] = React.useState(message || {});
  const [imageURL, setImageURL] = React.useState(
    message?.customFile?.location?.href
  );

  const handleChange = (event) => {
    if (event.target.id === "message") {
      setMessageEdit({ ...messageEdit, message: event.target.value });
    }
    if (event.target.id === "file") {
      const file = event.target.files[0];
      // this is 5mb
      if (file.size > 5000000) {
        toast.addToast({ type: "error", message: "File is too big!" });
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
      return true;
    }
    if (messageEdit?.file?.size > 5000000) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Modal className="z-40" show={open} onClose={handleClose}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <form className="space-y-6">
            <div id="textarea">
              <div className="mb-2 block">
                <Label htmlFor="message" value="Your message" />
              </div>
              <Textarea
                id="message"
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
                id="file"
                accept="image/*"
                helperText="Upload an image for the prompt!"
                onChange={handleChange}
              />
              {imageURL && <img src={imageURL} />}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={validate()}
            onClick={() => saveMessage(messageEdit)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
