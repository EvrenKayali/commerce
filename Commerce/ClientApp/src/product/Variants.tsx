import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { ProductVariant } from "../api/api";
import { ImageSelectionDialog } from "../components/ImageSelectionDialog";
import { SelectableImage } from "../components/ImageSelector";

interface VariantItemProps {
  variant: ProductVariant;
  onImageAdd: () => void;
}

function VariantItem({ variant, onImageAdd }: VariantItemProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Checkbox />
        {!variant.image ? (
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
        ) : (
          <img
            src={variant.image}
            alt=""
            style={{
              width: "75px",
              height: "75px",
              objectFit: "cover",
              marginRight: "1rem",
            }}
          />
        )}

        <Typography>{variant.name}</Typography>
      </Box>
      <Typography>Lorem ipsum</Typography>
    </Box>
  );
}

export interface props {
  items: ProductVariant[];
  images?: SelectableImage[];
  onChange: (variants: ProductVariant[]) => void;
}

export function Variants({ items, images, onChange }: props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();

  const handleImageSelected = (imgSrc: string) => {
    const modifiedItems = items.map((i) => ({
      ...i,
      image: i.name === selectedVariant ? imgSrc : i.image,
    }));
    setDialogOpen(false);

    onChange(modifiedItems);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="1rem">
          Variants
        </Typography>

        <FormControl sx={{ ml: "10px", mb: "1rem" }}>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography>
                <strong>Showing {items?.length} variants</strong>
              </Typography>
            }
          />
        </FormControl>
        {items.map((item, idx) => (
          <Box key={idx}>
            <VariantItem
              variant={item}
              onImageAdd={() => {
                setDialogOpen(true);
                setSelectedVariant(item.name);
              }}
            />

            <Divider sx={{ my: "1rem" }} />
          </Box>
        ))}
      </CardContent>
      <ImageSelectionDialog
        onDone={(src) => handleImageSelected(src)}
        isOpen={dialogOpen}
        images={images}
        onDialogClose={() => setDialogOpen(false)}
      />
    </Card>
  );
}
