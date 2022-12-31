import * as React from "react";
import {
  Modal,
  Button,
  Checkbox,
  Label,
  Textarea,
  FileInput,
} from "flowbite-react";
import { useCallback, useEffect, useState } from "react";

export default function MessageModal({ open, message, setOpen, saveMessage }) {
  console.log(message);
  const handleClose = () => setOpen(false);
  const [messageEdit, setMessageEdit] = useState({ ...message } || {});

  const [imageURL, setImageURL] = useState(message?.customFile?.location);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

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
    <Modal className="z-40 rounded" show={open} onClose={handleClose}>
      <div className="max-h-[80vh] rounded">
        <Modal.Header className="sticky top-0 z-1 bg-white">
          {message ? "Edit Message" : "Create your message"}
        </Modal.Header>
        <Modal.Body className="overflow-y-auto max-h-[60vh]">
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
            {message && (
              <div>
                <Checkbox
                  id="deleteImage"
                  checked={message?.deleteImage}
                  onClick={(e) =>
                    setMessageEdit({
                      ...messageEdit,
                      deleteImage: !messageEdit.deleteImage,
                    })
                  }
                />
                <Label className="pl-4" htmlFor="deleteImage">
                  No Image
                </Label>
              </div>
            )}

            {!messageEdit?.deleteImage && (
              <div id="fileUpload">
                <div className="mb-2 block">
                  <Label
                    htmlFor="file"
                    value={message ? "Upload New Image" : "Upload Image"}
                  />
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
            )}
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
      </div>
    </Modal>
  );
}
