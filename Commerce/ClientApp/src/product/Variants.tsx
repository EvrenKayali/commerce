import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  DialogTitle,
  Dialog,
  IconButton,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { ProductVariant } from "../api/api";
import { Image } from "../components/SortableImageList";

function VariantItem({
  variant,
  onImageAdd,
}: {
  variant: ProductVariant;
  onImageAdd: () => void;
}) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Box
          onClick={onImageAdd}
          width="75px"
          height="75px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ border: "1px dashed black", cursor: "pointer" }}
          mr="1rem"
        >
          <AddPhotoAlternate fontSize="large" />
        </Box>
        <Typography>{variant.name}</Typography>
      </Box>
      <Typography>Lorem ipsum</Typography>
    </Box>
  );
}

export interface props {
  items: ProductVariant[];
  images?: Image[];
}

export function Variants({ items, images }: props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="1rem">
          Variants
        </Typography>
        {items.map((item, idx) => (
          <Box key={idx}>
            <VariantItem
              variant={item}
              onImageAdd={() => setDialogOpen(true)}
            />
            <Divider sx={{ my: "1rem" }} />
          </Box>
        ))}
      </CardContent>
      <Dialog open={dialogOpen}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Edit Images
          <IconButton
            onClick={() => setDialogOpen(false)}
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
          {images?.map((image) => (
            <img
              src={image.src}
              alt=""
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                margin: "1rem",
              }}
            />
          ))}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
