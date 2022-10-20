import { Box, Divider } from "@mui/material";
import { Variant } from "../../api/api";
import { VariantItem } from "./VariantItem";

interface props {
  items: Variant[];
  selectedVariantKeys: string[];
  onVariantImageClick: (key: string) => void;
  onSelectionChange: (checked: boolean, key: string) => void;
}
export function VariantList({
  items,
  selectedVariantKeys,
  onVariantImageClick,
  onSelectionChange,
}: props) {
  return (
    <>
      {items.map((item) => (
        <Box key={item.key}>
          <VariantItem
            selected={selectedVariantKeys.some((v) => v === item.key)}
            variant={item}
            onImageAdd={() => onVariantImageClick(item.key)}
            onVariantSelect={(checked, key) => onSelectionChange(checked, key)}
          />
          <Divider sx={{ my: "1rem" }} />
        </Box>
      ))}
    </>
  );
}
