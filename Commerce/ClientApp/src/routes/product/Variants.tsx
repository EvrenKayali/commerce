import { Card, CardContent, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { ProductOption, Variant } from "../../api/api";
import { filterVariants } from "../../utils/variantHelper";
import { ImageSelectionDialog } from "../../components/ImageSelectionDialog";
import { SelectableImage } from "../../components/ImageSelector";
import { VariantList } from "./VariantList";
import { VariantSelection } from "./VariantSelection";
import { Controller, useFormContext } from "react-hook-form";

export interface props {
  options: ProductOption[];
  items: Variant[];
  images?: SelectableImage[];
  onChange: (variants: Variant[]) => void;
}

function Variants({ options, items, images, onChange }: props) {
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
        image: i.key === selectedVariantForImage ? imgSrc : i.imageSrc,
      }));
      setDialogOpen(false);
      setSelectedVariantForImage(undefined);
      onChange(modifiedItems);
    } else {
      const modifiedItems = items.map((i) => ({
        ...i,
        image: selectedVariants.some((v) => v === i.key) ? imgSrc : i.imageSrc,
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

  if (!Boolean(items.length)) return <></>;

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
          variantCount={items?.length}
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

export function VariantsFormPart({ options }: { options?: ProductOption[] }) {
  const { control, getValues } = useFormContext();

  if (!Boolean(options?.length)) return <></>;

  return (
    <Controller
      name="variants"
      control={control}
      render={({ field }) => (
        <Variants
          options={options || []}
          onChange={field.onChange}
          items={field.value || []}
          images={getValues("images")}
        />
      )}
    />
  );
}
