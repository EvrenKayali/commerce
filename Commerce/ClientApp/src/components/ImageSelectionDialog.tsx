import { UniqueIdentifier } from "@dnd-kit/core";
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { ImageSelector, SelectableImage } from "./ImageSelector";

export interface props {
  images?: SelectableImage[];
  selectedImage?: UniqueIdentifier;
  isOpen: boolean;
  onDone: (src: string) => void;
  onDialogClose: () => void;
}
export function ImageSelectionDialog({
  images,
  isOpen,
  onDialogClose,
  onDone,
}: props) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const HandleDone = () => {
    onDone(selectedImage!);
    onDialogClose();
  };
  return (
    <Dialog open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Edit Images
        <IconButton
          onClick={onDialogClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <ImageSelector
          images={images ?? []}
          selectedImage={selectedImage}
          onSelect={(id) => setSelectedImage(id)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} variant="outlined" color="error">
          Cancel
        </Button>
        <Button variant="contained" onClick={HandleDone}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
