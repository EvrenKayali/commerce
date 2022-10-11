import { Card, CardContent, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { ProductOption, ProductVariant } from "../../api/api";
import { filterVariants } from "../../utils/variantHelper";
import { ImageSelectionDialog } from "../../components/ImageSelectionDialog";
import { SelectableImage } from "../../components/ImageSelector";
import { VariantList } from "./VariantList";
import { VariantSelection } from "./VariantSelection";

export interface props {
  options: ProductOption[];
  items: ProductVariant[];
  images?: SelectableImage[];
  onChange: (variants: ProductVariant[]) => void;
}

export function Variants({ options, items, images, onChange }: props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVariantForImage, setSelectedVariantForImage] = useState<
    string | undefined
  >();
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [selectedFilterOptions, setSelectedFilterOptions] =
    useState<ProductOption[]>();

  const handleImageSelected = (imgSrc: string) => {
    if (selectedVariantForImage) {
      const modifiedItems = items.map((i) => ({
        ...i,
        image: i.key === selectedVariantForImage ? imgSrc : i.image,
      }));
      setDialogOpen(false);
      setSelectedVariantForImage(undefined);
      onChange(modifiedItems);
    } else {
      const modifiedItems = items.map((i) => ({
        ...i,
        image: selectedVariants.some((v) => v === i.key) ? imgSrc : i.image,
      }));
      setDialogOpen(false);
      setSelectedVariantForImage(undefined);
      onChange(modifiedItems);
    }
  };

  const handleVariantSelected = (checked: boolean, key: string) => {
    if (checked) {
      setSelectedVariants([...selectedVariants, key]);
      setSelectedFilterOptions([]);
    } else {
      setSelectedVariants(selectedVariants.filter((v) => v !== key));
      setSelectedFilterOptions([]);
    }
  };

  const handleVariantFilter = (val: ProductOption[]) => {
    setSelectedFilterOptions(val);

    const filteredKeys = filterVariants(items, val).map((r) => r.key);

    setSelectedVariants(filteredKeys);
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case "Edit Image":
        setDialogOpen(true);
        break;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="1rem">
          Variants
        </Typography>

        <VariantSelection
          options={options}
          selectedOptions={selectedFilterOptions}
          onActionClick={handleActionClick}
          onChange={handleVariantFilter}
          selectedVariantCount={selectedVariants.length}
          variantCount={items.length}
        />

        <Divider sx={{ my: "1rem" }} />
        <VariantList
          items={items}
          onSelectionChange={handleVariantSelected}
          selectedVariantKeys={selectedVariants}
          onVariantImageClick={(key) => {
            setDialogOpen(true);
            setSelectedVariantForImage(key);
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