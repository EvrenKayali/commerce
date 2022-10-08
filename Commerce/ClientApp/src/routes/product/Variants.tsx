import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { ProductVariant } from "../../api/api";
import { ImageSelectionDialog } from "../../components/ImageSelectionDialog";
import { SelectableImage } from "../../components/ImageSelector";
import { VariantList } from "./VariantList";
import { VariantSelection, VariantSelectionType } from "./VariantSelection";

export interface props {
  items: ProductVariant[];
  images?: SelectableImage[];
  onChange: (variants: ProductVariant[]) => void;
}

export function Variants({ items, images, onChange }: props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);

  const handleImageSelected = (imgSrc: string) => {
    const modifiedItems = items.map((i) => ({
      ...i,
      image: i.key === selectedVariant ? imgSrc : i.image,
    }));
    setDialogOpen(false);

    onChange(modifiedItems);
  };

  const handleVariantSelected = (checked: boolean, key: string) => {
    if (checked) {
      setSelectedVariants([...selectedVariants, key]);
    } else {
      setSelectedVariants(selectedVariants.filter((v) => v !== key));
    }
  };

  const handleVariantFilter = (val: VariantSelectionType) => {
    if (val === "all") {
      setSelectedVariants(items.map((i) => i.key));
    }
    if (val === "none") {
      setSelectedVariants([]);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="1rem">
          Variants
        </Typography>

        <VariantSelection onChange={handleVariantFilter} />
        <Box
          mb="1rem"
          p=".25rem"
          display="flex"
          sx={{
            border: "1px solid black",
            width: "auto",
            display: "inline-block",
          }}
        >
          <Checkbox
            checked={selectedVariants.length === items.length}
            indeterminate={
              selectedVariants.length > 0 &&
              selectedVariants.length < items.length
            }
            onChange={(_, checked) =>
              setSelectedVariants(checked ? items.map((i) => i.key) : [])
            }
            sx={{ padding: "0 .5rem 0 0" }}
          />
          <Typography component="span">Test test test</Typography>
        </Box>
        <Divider sx={{ marginBottom: "1rem" }} />
        <VariantList
          items={items}
          onSelectionChange={handleVariantSelected}
          selectedVariantKeys={selectedVariants}
          onVariantImageClick={(key) => {
            setDialogOpen(true);
            setSelectedVariant(key);
          }}
        />
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
