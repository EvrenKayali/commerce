import { Card, CardContent, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { ProductOption, ProductVariant } from "../../api/api";
import { ImageSelectionDialog } from "../../components/ImageSelectionDialog";
import { SelectableImage } from "../../components/ImageSelector";
import { VariantList } from "./VariantList";
import { VariantSelection, VariantSelectionType } from "./VariantSelection";

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
    } else {
      setSelectedVariants(selectedVariants.filter((v) => v !== key));
    }
  };

  const handleVariantFilter = (val: VariantSelectionType) => {
    if (val === "all") {
      setSelectedVariants(items.map((i) => i.key));
      setSelectedFilterOptions([]);
      return;
    }

    if (val === "none") {
      setSelectedVariants([]);
      setSelectedFilterOptions([]);
      return;
    }

    setSelectedFilterOptions(val);

    console.log(val);

    const filtered = items
      .filter((i) =>
        i.optionAttributes?.some(
          (a) =>
            a.name === "Color" &&
            val.find((c) => c.name === "Color")?.values.includes(a.value)
        )
      )
      .map((x) => x.key);

    setSelectedVariants(filtered);
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
